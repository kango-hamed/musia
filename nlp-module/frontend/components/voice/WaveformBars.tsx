"use client";

interface WaveformBarsProps {
  volumeLevel: number;
  isActive: boolean;
  color?: string;
  bars?: number;
}

export function WaveformBars({ volumeLevel, isActive, color = "#5E6AD2", bars = 28 }: WaveformBarsProps) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const phase = Math.sin((Date.now() / 300 + i * 0.4)) * 0.5 + 0.5;
        const center = Math.sin((i / bars) * Math.PI);
        const height = isActive
          ? Math.max(4, volumeLevel * 32 * center * (0.6 + phase * 0.4))
          : 3 + Math.sin((i / bars) * Math.PI) * 2;

        return (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 3,
              height: `${height}px`,
              background: color,
              opacity: isActive ? 0.8 + center * 0.2 : 0.3,
              transition: "height 80ms ease, opacity 150ms ease",
            }}
          />
        );
      })}
    </div>
  );
}
