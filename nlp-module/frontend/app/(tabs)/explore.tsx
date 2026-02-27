import { Platform, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Theme ────────────────────────────────────────────────────────────────────
const GOLD    = '#C9A84C';
const BG      = '#12100E';
const SURFACE = '#1C1916';
const SURFACE2 = '#242019';
const BORDER  = '#2e2a24';
const MUTED   = '#7a7368';
const TEXT    = '#d4cfc8';

// ─── Types ────────────────────────────────────────────────────────────────────
type CollapsibleItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  content: string;
};

// ─── Contenu musée ────────────────────────────────────────────────────────────
const SECTIONS: CollapsibleItem[] = [
  {
    id: '1',
    icon: 'mic-outline',
    title: 'Comment utiliser Musia',
    content:
      "Appuyez sur le microphone et posez votre question en français. Musia écoute, transcrit votre voix et vous répond instantanément. Vous pouvez aussi taper votre question dans le champ de saisie.",
  },
  {
    id: '2',
    icon: 'image-outline',
    title: 'Identifier une œuvre',
    content:
      "Demandez à Musia « Quelle est cette peinture ? » ou « Qui a créé cette sculpture ? » devant n'importe quelle œuvre. Musia est formée sur des milliers d'œuvres des plus grands musées du monde.",
  },
  {
    id: '3',
    icon: 'navigate-outline',
    title: 'S\'orienter dans le musée',
    content:
      'Dites « Comment aller à l\'aile égyptienne ? » ou « Où sont les impressionnistes ? ». Musia connaît le plan de chaque musée partenaire et vous guidera pas à pas.',
  },
  {
    id: '4',
    icon: 'language-outline',
    title: 'Langues disponibles',
    content:
      'Musia parle couramment le français, l\'anglais, l\'espagnol, l\'arabe et le japonais. La langue par défaut est le français — précisez simplement votre langue préférée au début de la conversation.',
  },
  {
    id: '5',
    icon: 'time-outline',
    title: 'Horaires & informations pratiques',
    content:
      'Demandez « À quelle heure ferme le musée ? », « Y a-t-il un vestiaire ? » ou « Où est la cafétéria ? ». Musia a accès aux informations en temps réel de chaque établissement partenaire.',
  },
  {
    id: '6',
    icon: 'sparkles-outline',
    title: 'Anecdotes & histoires secrètes',
    content:
      'Chaque œuvre a une histoire cachée. Demandez « Raconte-moi quelque chose d\'insolite sur ce tableau » et laissez Musia vous surprendre avec des anecdotes que les cartels n\'affichent pas.',
  },
];

// ─── CollapsibleCard ─────────────────────────────────────────────────────────
function CollapsibleCard({ item }: { item: CollapsibleItem }) {
  const [open, setOpen] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const height   = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toOpen = !open;
    setOpen(toOpen);
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: toOpen ? 1 : 0,
        duration: 260,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(height, {
        toValue: toOpen ? 1 : 0,
        duration: 280,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false, // height can't use native driver
      }),
    ]).start();
  };

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] });
  // Approximate max height — adjust if content is longer
  const maxH = height.interpolate({ inputRange: [0, 1], outputRange: [0, 120] });

  return (
    <View style={card.wrapper}>
      <Pressable onPress={toggle} style={card.header}>
        <View style={card.iconWrap}>
          <Ionicons name={item.icon} size={18} color={GOLD} />
        </View>
        <Text style={card.title}>{item.title}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-forward" size={16} color={MUTED} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[card.body, { maxHeight: maxH, overflow: 'hidden' }]}>
        <Text style={card.content}>{item.content}</Text>
      </Animated.View>
    </View>
  );
}

// ─── TabTwoScreen ─────────────────────────────────────────────────────────────
export default function TabTwoScreen() {
  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>M</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>EXPLORER</Text>
            <Text style={styles.headerSub}>Guide & Fonctionnalités</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="compass" size={36} color={GOLD} />
          </View>
          <Text style={styles.heroTitle}>Bienvenue dans Musia</Text>
          <Text style={styles.heroSub}>
            Votre guide de musée intelligent, disponible 24h/24, dans votre poche.
          </Text>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>FONCTIONNALITÉS</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* ── Collapsibles ── */}
        {SECTIONS.map((item) => (
          <CollapsibleCard key={item.id} item={item} />
        ))}

        {/* ── Footer note ── */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={16} color={MUTED} />
          <Text style={styles.footerText}>
            Musia est en constante évolution. De nouvelles fonctionnalités arrivent chaque mois.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Card styles ──────────────────────────────────────────────────────────────
const card = StyleSheet.create({
  wrapper: {
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: SURFACE2,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 0.3,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: SURFACE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerInner: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logoMark: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: {
    color: BG, fontSize: 22, fontWeight: '800', letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerTitle: {
    color: GOLD, fontSize: 18, fontWeight: '700', letterSpacing: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerSub: { color: MUTED, fontSize: 11, letterSpacing: 1.5, marginTop: 1 },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  heroIcon: {
    width: 72, height: 72, borderRadius: 22,
    backgroundColor: SURFACE2,
    borderWidth: 1, borderColor: BORDER,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, shadowRadius: 16,
  },
  heroTitle: {
    color: TEXT,
    fontSize: 20, fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  heroSub: {
    color: MUTED, fontSize: 13, lineHeight: 20,
    textAlign: 'center', paddingHorizontal: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Divider
  divider: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 16,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: { color: MUTED, fontSize: 10, letterSpacing: 2, fontWeight: '600' },

  // Footer
  footer: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 8, marginTop: 8,
    paddingHorizontal: 4,
  },
  footerText: {
    flex: 1, color: MUTED, fontSize: 12, lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
});