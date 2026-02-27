/**
 * Musia – Museum Guide Chatbot
 *
 * Speech-to-text strategy (Expo Go compatible):
 *   1. Record audio with expo-av (works in Expo Go, no native module needed)
 *   2. Send the .m4a file to OpenAI Whisper API via multipart/form-data
 *   3. Whisper returns the French transcript
 *
 * Install: npx expo install expo-av
 * Set:     WHISPER_API_KEY in your env / constants file
 */

import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

// ─── Config ───────────────────────────────────────────────────────────────────
// Use your local IP or backend URL here (e.g., http://192.168.1.XX:8000 for Expo testing)
// For Android emulator it could be 10.0.2.2. For iOS simulator, localhost may work.
// Depending on environment, you might need your local IPv4 address
const API_URL = 'http://192.168.12.138:8000'; 
// const WHISPER_API_KEY = 'YOUR_OPENAI_API_KEY'; // Not needed anymore

// ─── Theme ────────────────────────────────────────────────────────────────────
const GOLD       = '#C9A84C';
const GOLD_LIGHT = '#E8C96A';
const BG         = '#12100E';
const SURFACE    = '#1C1916';
const SURFACE2   = '#242019';

// ─── Types ────────────────────────────────────────────────────────────────────
type Message      = { id: string; role: 'user' | 'musia'; text: string };
type RecordingState = 'idle' | 'recording' | 'processing';

// ─── Whisper transcription & AI logic (Moved to Backend) ────────────────────────
// The backend now handles STT -> NLP -> LLM -> TTS
async function askMusiaAudio(sessionId: string, audioUri: string): Promise<{ text: string, audioUrl: string }> {
  try {
    const formData = new FormData();

    // On React Native, FormData accepts { uri, name, type } as a file value
    formData.append('audio_file', {
      uri: audioUri,
      name: 'audio.m4a',
      type: 'audio/m4a',
    } as any);
    formData.append('session_id', sessionId);

    console.log('[API] Sending audio to backend...', audioUri);
    const response = await fetch(`${API_URL}/conversation/ask`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[API] Backend error (audio):', errText);
      throw new Error(`Backend error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    console.log('[API] Received audio response:', data);
    return {
      text: data.response,
      audioUrl: data.audio_url,
    };
  } catch (error) {
    console.error('askMusiaAudio error:', error);
    throw error;
  }
}

// ─── Musia AI logic (Text Fallback) ──────────────────────────────────────────
async function askMusiaText(sessionId: string, userText: string): Promise<{ text: string, audioUrl: string }> {
  try {
    console.log('[API] Sending text to backend...');
    const response = await fetch(`${API_URL}/conversation/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: userText,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[API] Backend error (text):', errText);
      throw new Error(`Backend error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    console.log('[API] Received text response:', data);
    return {
      text: data.response,
      audioUrl: data.audio_url,
    };
  } catch (error) {
    console.error('askMusiaText error:', error);
    throw error;
  }
}

// ─── Audio recording helpers ──────────────────────────────────────────────────
const RECORDING_OPTIONS: Audio.RecordingOptions = {
  ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
  // Force m4a/aac which Whisper handles well
  ios: {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
    extension: '.m4a',
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
  },
  android: {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
    extension: '.m4a',
  },
};

// ─── MicButton ───────────────────────────────────────────────────────────────
function MicButton({
  state,
  onPress,
}: {
  state: RecordingState;
  onPress: () => void;
}) {
  const pulse = useRef(new Animated.Value(1)).current;
  const ring  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'recording') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.13, duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1,    duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
      Animated.loop(
        Animated.sequence([
          Animated.timing(ring, { toValue: 1, duration: 1100, useNativeDriver: true }),
          Animated.timing(ring, { toValue: 0, duration: 0,    useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      ring.stopAnimation();
      Animated.timing(pulse, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      ring.setValue(0);
    }
  }, [state]);

  const ringOpacity = ring.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.7, 0.15, 0] });
  const ringScale   = ring.interpolate({ inputRange: [0, 1],       outputRange: [1, 2.1] });

  const isRecording  = state === 'recording';
  const isProcessing = state === 'processing';

  const renderIcon = () => {
    if (isProcessing) return <ActivityIndicator color={GOLD} size="small" />;
    if (isRecording)  return <Ionicons name="stop"  size={28} color={GOLD_LIGHT} />;
    return                   <Ionicons name="mic"   size={28} color={GOLD} />;
  };

  return (
    <View style={styles.micWrapper}>
      <Animated.View
        style={[styles.micRing, { opacity: ringOpacity, transform: [{ scale: ringScale }] }]}
      />
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <Pressable
          onPress={onPress}
          disabled={isProcessing}
          style={[
            styles.micButton,
            isRecording  && styles.micButtonActive,
            isProcessing && styles.micButtonProcessing,
          ]}
        >
          {renderIcon()}
        </Pressable>
      </Animated.View>
      <Text style={styles.micLabel}>
        {isProcessing
          ? 'Transcription…'
          : isRecording
          ? 'Appuyez pour arrêter'
          : 'Appuyez pour parler'}
      </Text>
    </View>
  );
}

// ─── ChatBubble ───────────────────────────────────────────────────────────────
function ChatBubble({ message }: { message: Message }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 350, delay: 40, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 350, delay: 40, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  }, []);

  const isUser = message.role === 'user';

  return (
    <Animated.View
      style={[
        styles.bubbleRow,
        isUser ? styles.bubbleRowUser : styles.bubbleRowMusia,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleMusia]}>
        <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextMusia]}>
          {message.text}
        </Text>
      </View>
    </Animated.View>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [typedText, setTypedText]           = useState('');
  const scrollRef                           = useRef<ScrollView>(null);
  const recordingRef                        = useRef<Audio.Recording | null>(null);
  const [sound, setSound]                   = useState<Audio.Sound | null>(null);

  // ── Request mic permission on mount & Start Session ───────────────────────
  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (!granted) console.warn('Microphone permission not granted');
    });
    // Ensure audio session is set up correctly for recording
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // Start Musia Session
    const startSession = async () => {
      try {
        console.log('[API] Starting new session...');
        const response = await fetch(`${API_URL}/conversation/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ artwork_id: null })
        });
        if (response.ok) {
          const data = await response.json();
          setSessionId(data.session_id);
          addMessage({ role: 'musia', text: data.message });
          if (data.audio_url) {
            playAudioResponse(data.audio_url);
          }
        }
      } catch (err) {
        console.error('Failed to start session:', err);
        addMessage({ role: 'musia', text: "Erreur de connexion au serveur Musia." });
      }
    };

    startSession();
  }, []);

  // Unload sound when unmounting
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addMessage = (msg: Omit<Message, 'id'>) => {
    const id = Date.now().toString();
    setMessages((prev) => [...(prev || []), { ...msg, id }]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const playAudioResponse = async (audioPath: string) => {
    try {
      if (sound) await sound.unloadAsync();
      const fullUrl = `${API_URL}${audioPath}`;
      console.log('[Audio] Playing from:', fullUrl);
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: fullUrl });
      setSound(newSound);
      await newSound.playAsync();
    } catch (err) {
      console.error('[Audio] Playback error:', err);
    }
  };

  const handleMusiaReply = async (userText: string) => {
    addMessage({ role: 'user', text: userText });
    setRecordingState('processing');
    try {
      if (!sessionId) throw new Error("No active session");
      const { text: reply, audioUrl } = await askMusiaText(sessionId, userText);
      addMessage({ role: 'musia', text: reply });
      if (audioUrl) {
        playAudioResponse(audioUrl);
      }
    } catch (err) {
      addMessage({ role: 'musia', text: "Désolé, je n'ai pas pu joindre le serveur." });
    } finally {
      setRecordingState('idle');
    }
  };

  // ── Mic: start recording ───────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(RECORDING_OPTIONS);
      await recording.startAsync();
      recordingRef.current = recording;
      setRecordingState('recording');
    } catch (err) {
      console.warn('startRecording error:', err);
    }
  };

  // ── Mic: stop recording → transcribe ──────────────────────────────────────
  const stopRecording = async () => {
    const recording = recordingRef.current;
    if (!recording) return;

    setRecordingState('processing');
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;

      if (uri && sessionId) {
        // Now calling backend endpoint which does STT and returns the LLM text + TTS audio
        const { text: reply, audioUrl } = await askMusiaAudio(sessionId, uri);
        addMessage({ role: 'user', text: "(Audio)" }); // Placeholder since backend returned the response
        if (reply) {
            addMessage({ role: 'musia', text: reply });
        }
        
        if (audioUrl) {
          playAudioResponse(audioUrl);
        }
      } else if (!sessionId) {
        addMessage({ role: 'musia', text: "Erreur : session non initialisée." });
      }
    } catch (err) {
      console.warn('stopRecording error:', err);
      addMessage({ role: 'musia', text: "Erreur lors du traitement de votre voix." });
    } finally {
      setRecordingState('idle');
    }
  };

  const handleMicPress = useCallback(() => {
    if (recordingState === 'recording') {
      stopRecording();
    } else if (recordingState === 'idle') {
      startRecording();
    }
  }, [recordingState]);

  // ── Text send ──────────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = typedText.trim();
    if (!text) return;
    setTypedText('');
    handleMusiaReply(text);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>M</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>MUSIA</Text>
            <Text style={styles.headerSub}>Guide de Musée</Text>
          </View>
        </View>
        <View style={styles.statusDot} />
      </View>

      {/* ── Chat ── */}
      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
      </ScrollView>

      {/* ── Mic ── */}
      <MicButton state={recordingState} onPress={handleMicPress} />

      {/* ── Text input ── */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={typedText}
          onChangeText={setTypedText}
          placeholder="Ou tapez votre question…"
          placeholderTextColor="#6b6560"
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="arrow-up" size={20} color={BG} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Header
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: SURFACE,
    borderBottomWidth: 1,
    borderBottomColor: '#2e2a24',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInner: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logoMark: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: {
    color: BG, fontSize: 22, fontWeight: '800', letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerTitle: {
    color: GOLD, fontSize: 18, fontWeight: '700', letterSpacing: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerSub: { color: '#7a7368', fontSize: 11, letterSpacing: 1.5, marginTop: 1 },
  statusDot: {
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: '#4caf74',
    shadowColor: '#4caf74',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 6,
  },

  // Chat
  chat: { flex: 1 },
  chatContent: { padding: 20, paddingBottom: 8, gap: 12 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  bubbleRowUser:  { justifyContent: 'flex-end' },
  bubbleRowMusia: { justifyContent: 'flex-start' },
  avatar: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: {
    color: BG, fontWeight: '800', fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  bubble: { maxWidth: '78%', borderRadius: 18, paddingHorizontal: 16, paddingVertical: 11 },
  bubbleMusia: {
    backgroundColor: SURFACE2,
    borderTopLeftRadius: 4,
    borderWidth: 1, borderColor: '#2e2a24',
  },
  bubbleUser: { backgroundColor: GOLD, borderTopRightRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextMusia: {
    color: '#d4cfc8',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  bubbleTextUser: { color: BG, fontWeight: '500' },

  // Mic
  micWrapper: { alignItems: 'center', paddingVertical: 20, gap: 8 },
  micRing: {
    position: 'absolute',
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 2, borderColor: GOLD,
  },
  micButton: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: SURFACE2,
    borderWidth: 2, borderColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25, shadowRadius: 12,
    elevation: 6,
  },
  micButtonActive: {
    backgroundColor: '#2a1f0a',
    borderColor: GOLD_LIGHT,
    shadowOpacity: 0.7, shadowRadius: 20,
  },
  micButtonProcessing: { opacity: 0.55 },
  micLabel: { color: '#7a7368', fontSize: 12, letterSpacing: 1 },

  // Input
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 32 : 16,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: SURFACE, color: '#d4cfc8',
    borderRadius: 14,
    borderWidth: 1, borderColor: '#2e2a24',
    paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 15,
  },
  sendButton: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
  },
});