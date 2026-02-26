let globalAudio: HTMLAudioElement | null = null;

export function playAudioUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (globalAudio) {
      globalAudio.pause();
      globalAudio = null;
    }
    const audio = new Audio(url);
    globalAudio = audio;
    audio.onended = () => { globalAudio = null; resolve(); };
    audio.onerror = (e) => { globalAudio = null; reject(e); };
    audio.play().catch(reject);
  });
}

export function stopAudio() {
  if (globalAudio) {
    globalAudio.pause();
    globalAudio = null;
  }
}

export function isAudioPlaying(): boolean {
  return !!globalAudio && !globalAudio.paused;
}
