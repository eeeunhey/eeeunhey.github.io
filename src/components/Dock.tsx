import React, { useState } from 'react';

export interface DockAppItem {
  id: string;
  name: string;
  iconBg: string;
  iconSymbol: string;
  targetWindow: string;
  externalUrl?: string;
}

export const DOCK_APPS: DockAppItem[] = [
  {
    id: 'dock-finder',
    name: 'Finder',
    iconBg: 'linear-gradient(180deg, #5AB1F6 0%, #1776D2 100%)',
    iconSymbol: '',
    targetWindow: '',
  },
  {
    id: 'dock-projects',
    name: 'Projects Shelf',
    iconBg: 'linear-gradient(180deg, #67B1F3 0%, #1E80DE 100%)',
    iconSymbol: '📁',
    targetWindow: 'projects',
  },
  {
    id: 'dock-movement',
    name: 'Mindful Movement',
    iconBg: 'linear-gradient(180deg, #F9D4D7 0%, #E0C3FC 50%, #8EC5FC 100%)',
    iconSymbol: '🧘‍♀️',
    targetWindow: 'movement',
  },
  {
    id: 'dock-notes',
    name: 'Study Log',
    iconBg: 'linear-gradient(180deg, #FDF0A6 0%, #F5CF53 100%)',
    iconSymbol: '📓',
    targetWindow: 'study',
  },
  {
    id: 'dock-conferences',
    name: 'Conferences',
    iconBg: 'linear-gradient(180deg, #4A6FA0 0%, #1E3C72 100%)',
    iconSymbol: '🎟️',
    targetWindow: 'conferences',
  },
  {
    id: 'dock-about',
    name: 'About Eunhye',
    iconBg: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)',
    iconSymbol: '🪪',
    targetWindow: 'about',
  },
  {
    id: 'dock-github',
    name: 'GitHub',
    iconBg: 'linear-gradient(180deg, #24292E 0%, #0D1117 100%)',
    iconSymbol: '🐙',
    targetWindow: '',
    externalUrl: 'https://github.com/eeeunhey',
  },
  {
    id: 'dock-music',
    name: 'Music BGM',
    iconBg: 'linear-gradient(180deg, #FC5C7D 0%, #6A82FB 100%)',
    iconSymbol: '🎵',
    targetWindow: '',
  },
];

interface DockProps {
  openWindows: Record<string, boolean>;
  onAppClick: (targetWindow: string, externalUrl?: string) => void;
  onToggleMusic: () => void;
  dockItemRefMap: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export const Dock: React.FC<DockProps> = ({
  openWindows,
  onAppClick,
  onToggleMusic,
  dockItemRefMap,
}) => {
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.42)',
          backdropFilter: 'blur(32px) saturate(190%)',
          WebkitBackdropFilter: 'blur(32px) saturate(190%)',
          padding: '8px 14px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.55)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        }}
      >
        {DOCK_APPS.map((app, index) => {
          const isHovered = hoveredAppId === app.id;
          const isOpen = app.targetWindow ? openWindows[app.targetWindow] : false;

          // Subtle dock magnification for neighbors
          let scale = 1;
          if (isHovered) scale = 1.25;

          return (
            <div
              key={app.id}
              ref={(el) => {
                dockItemRefMap.current[app.id] = el;
                if (app.targetWindow) {
                  dockItemRefMap.current[app.targetWindow] = el;
                }
              }}
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}
              onClick={() => {
                if (app.id === 'dock-music') {
                  onToggleMusic();
                } else if (app.externalUrl) {
                  window.open(app.externalUrl, '_blank', 'noreferrer');
                } else if (app.targetWindow) {
                  onAppClick(app.targetWindow);
                }
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transform: `scale(${scale})`,
                transformOrigin: 'bottom center',
                transition: 'transform 0.18s cubic-bezier(0.2, 0, 0.2, 1)',
                paddingBottom: '4px',
              }}
              title={app.name}
            >
              {/* Tooltip on Hover */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-36px',
                    background: 'rgba(30, 30, 30, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  {app.name}
                </div>
              )}

              {/* Squircle App Icon */}
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: app.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'filter 0.15s',
                  filter: isHovered ? 'brightness(1.08)' : 'none',
                }}
              >
                {app.iconSymbol}
              </div>

              {/* Running Indicator Dot */}
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: isOpen ? '#1d1d1f' : 'transparent',
                  marginTop: '4px',
                  transition: 'background 0.2s',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
