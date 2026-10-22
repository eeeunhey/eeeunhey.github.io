import React from 'react';

export interface ThemeOption {
  id: string;
  name: string;
  color: string;
  bgGradient: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'blue',
    name: 'Day Sky',
    color: '#6BA3DA',
    bgGradient: 'linear-gradient(135deg, #dbeaf7 0%, #7da7d9 50%, #4a77b4 100%)',
  },
  {
    id: 'lilac',
    name: 'Lilac Dusk',
    color: '#9D8EC9',
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #b39ddb 50%, #7e57c2 100%)',
  },
  {
    id: 'sage',
    name: 'Sage Zen',
    color: '#7FA894',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 50%, #66bb6a 100%)',
  },
  {
    id: 'dark',
    name: 'Graphite Night',
    color: '#2C3440',
    bgGradient: 'linear-gradient(135deg, #1e2530 0%, #2b3648 50%, #151b24 100%)',
  },
];

interface WidgetsProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Widgets: React.FC<WidgetsProps> = ({
  currentThemeId,
  onSelectTheme,
  isPlaying,
  onTogglePlay,
}) => {
  return (
    <aside
      style={{
        position: 'fixed',
        top: '44px',
        right: '20px',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {/* 1. Theme Switcher Card */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '16px',
          padding: '12px 16px',
          border: '1px solid rgba(255, 255, 255, 0.45)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: 'rgba(0, 0, 0, 0.55)',
          }}
        >
          Choose a theme
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {THEMES.map((theme) => {
            const isSelected = currentThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                title={theme.name}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: theme.color,
                  border: isSelected ? '2px solid #ffffff' : '1px solid rgba(0,0,0,0.15)',
                  boxShadow: isSelected
                    ? `0 0 0 2px ${theme.color}, 0 2px 6px rgba(0,0,0,0.2)`
                    : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.15s ease-out',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 2. Weather Cards (Two Columns: Seoul & San Francisco) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Seoul Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '16px',
            padding: '14px',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'rgba(0, 0, 0, 0.5)',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Seoul</span>
            <span>🇰🇷</span>
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#1d1d1f',
              lineHeight: 1,
              marginBottom: '8px',
            }}
          >
            18°
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(0, 0, 0, 0.65)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⛅</span>
            <span>Clear & Mild</span>
          </div>
        </div>

        {/* San Francisco Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '16px',
            padding: '14px',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'rgba(0, 0, 0, 0.5)',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>San Francisco</span>
            <span>🇺🇸</span>
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#1d1d1f',
              lineHeight: 1,
              marginBottom: '8px',
            }}
          >
            16°
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(0, 0, 0, 0.65)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>☁️</span>
            <span>Overcast</span>
          </div>
        </div>
      </div>

      {/* 3. Now Playing Music Player Card (Reference Style) */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '18px',
          padding: '16px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: 'rgba(0, 0, 0, 0.5)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Now Playing</span>
          <span style={{ fontSize: '12px' }}>🎧</span>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Album Cover Art */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
              boxShadow: '0 4px 12px rgba(255, 126, 95, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '24px',
              flexShrink: 0,
            }}
          >
            🌸
          </div>

          {/* Track Info & Playlist */}
          <div style={{ flex: 1, minWidth: 0, fontSize: '12px' }}>
            <div style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              1. Glue — BICEP
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.55)', fontSize: '11px', marginBottom: '2px' }}>
              2. Apricots — BICEP
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '11px' }}>
              3. Opal — Four Tet Remix
            </div>
          </div>
        </div>

        {/* Subtitle tag */}
        <div
          style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '11px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: 500 }}>
            soft electronic · ☆ eunhye
          </span>

          {/* Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Prev */}
            <button
              onClick={onTogglePlay}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1d1d1f',
                fontSize: '13px',
                padding: '2px',
              }}
              title="Previous Track"
            >
              ⏮
            </button>

            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#1d1d1f',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.1s',
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>

            {/* Next */}
            <button
              onClick={onTogglePlay}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1d1d1f',
                fontSize: '13px',
                padding: '2px',
              }}
              title="Next Track"
            >
              ⏭
            </button>
          </div>
        </div>

        <div style={{ marginTop: '8px', textAlign: 'right' }}>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '11px',
              color: 'rgba(0, 0, 0, 0.55)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            open in spotify →
          </a>
        </div>
      </div>
    </aside>
  );
};
