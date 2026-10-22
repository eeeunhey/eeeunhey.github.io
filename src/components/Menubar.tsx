import React, { useState, useEffect } from 'react';

interface MenubarProps {
  activeAppTitle: string;
  isPlayingBgm: boolean;
  onToggleBgm: () => void;
  onOpenWindow: (windowId: string) => void;
}

export const Menubar: React.FC<MenubarProps> = ({
  activeAppTitle,
  isPlayingBgm,
  onToggleBgm,
  onOpenWindow,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const date = now.getDate();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTimeStr(`${dayName} ${monthName} ${date}  ${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '30px',
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        fontSize: '13px',
        color: '#1d1d1f',
        fontWeight: 500,
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      {/* Left Menu Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Apple Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '2px 4px',
            borderRadius: '4px',
            transition: 'background 0.15s',
          }}
          title="About Eunhye's Mac"
          onClick={() => onOpenWindow('about')}
        >
          <svg width="15" height="15" viewBox="0 0 170 170" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.65-14-4.89-7.51-8.91-16.14-12.06-25.88-3.15-9.74-4.73-19.14-4.73-28.2 0-14.45 3.7-26.01 11.1-34.69 7.4-8.68 16.5-13.12 27.3-13.33 4.89 0 10.35 1.34 16.37 4.02 6.03 2.68 9.94 4.08 11.75 4.2 1.58-.23 5.49-1.63 11.74-4.2 6.25-2.58 11.53-3.8 15.85-3.66 12.07.72 21.6 5.34 28.58 13.88-10.76 6.52-16.03 15.53-15.82 27.05.21 9.02 3.69 16.63 10.42 22.84 6.74 6.21 14.88 9.8 24.42 10.77-2.39 7.06-5.43 14.32-9.11 21.78zM119.22 32.64c0-7.29 2.58-14.07 7.74-20.34 5.16-6.27 11.64-10.37 19.45-12.3 0 .98.05 1.85.15 2.61.1 1.74.07 3.37-.1 4.89-.54 7.29-3.21 14.15-8.01 20.58-4.8 6.43-11.22 10.43-19.23 12-0.01-2.45 0-4.93 0-7.44z" />
          </svg>
        </div>

        {/* Current Active App */}
        <span style={{ fontWeight: 650, letterSpacing: '-0.2px' }}>
          {activeAppTitle || 'Eunhye OS'}
        </span>

        {/* Navigation Menus */}
        <div style={{ display: 'flex', gap: '14px', opacity: 0.85, fontWeight: 500 }}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onOpenWindow('projects')}
          >
            Projects
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onOpenWindow('movement')}
          >
            Movement
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onOpenWindow('study')}
          >
            Notes
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onOpenWindow('conferences')}
          >
            Conferences
          </span>
        </div>
      </div>

      {/* Right System Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
        {/* BGM Toggle Mini Button */}
        <button
          onClick={onToggleBgm}
          style={{
            background: isPlayingBgm ? 'rgba(74, 111, 160, 0.2)' : 'transparent',
            border: 'none',
            borderRadius: '6px',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#1d1d1f',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title={isPlayingBgm ? 'BGM 일시정지' : 'BGM 재생'}
        >
          <span style={{ fontSize: '12px' }}>{isPlayingBgm ? '🎵' : '🔇'}</span>
          <span>{isPlayingBgm ? 'Soft Electronic' : 'Music Off'}</span>
        </button>

        {/* Wi-Fi Icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
        </svg>

        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <svg width="18" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="1" width="18" height="12" rx="2.5" />
            <rect x="3" y="3" width="13" height="8" rx="1.5" fill="#34C759" stroke="none" />
            <path d="M21 4.5v5" strokeWidth="2" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600 }}>100%</span>
        </div>

        {/* Spotlight Search Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }} onClick={() => onOpenWindow('projects')}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Control Center Icon */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer' }}>
          <div style={{ width: '13px', height: '2px', background: '#1d1d1f', borderRadius: '1px' }} />
          <div style={{ width: '9px', height: '2px', background: '#1d1d1f', borderRadius: '1px' }} />
        </div>

        {/* Live Date & Time */}
        <span style={{ fontWeight: 600, letterSpacing: '-0.1px' }}>
          {timeStr}
        </span>
      </div>
    </header>
  );
};
