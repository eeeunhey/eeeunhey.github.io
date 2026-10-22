import React, { useState, useRef } from 'react';

export interface DesktopItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'folder' | 'app' | 'document' | 'link';
  defaultX: number; // Percentage or px
  defaultY: number;
  iconType: 'folder' | 'yoga' | 'notes' | 'ticket' | 'resume' | 'github';
  targetWindow: string;
  externalUrl?: string;
}

export const DEFAULT_DESKTOP_ITEMS: DesktopItem[] = [
  {
    id: 'desk-projects',
    title: 'Projects',
    subtitle: 'AI & Web Shelf',
    type: 'folder',
    defaultX: 38,
    defaultY: 34,
    iconType: 'folder',
    targetWindow: 'projects',
  },
  {
    id: 'desk-movement',
    title: 'Mindful Movement',
    subtitle: 'Pilates & Yoga',
    type: 'app',
    defaultX: 50,
    defaultY: 34,
    iconType: 'yoga',
    targetWindow: 'movement',
  },
  {
    id: 'desk-notes',
    title: 'Study Log',
    subtitle: 'Daily Notes',
    type: 'document',
    defaultX: 62,
    defaultY: 34,
    iconType: 'notes',
    targetWindow: 'study',
  },
  {
    id: 'desk-conferences',
    title: 'Conferences',
    subtitle: 'Tech Seminars',
    type: 'document',
    defaultX: 38,
    defaultY: 55,
    iconType: 'ticket',
    targetWindow: 'conferences',
  },
  {
    id: 'desk-about',
    title: 'About Me',
    subtitle: 'Profile & Resume',
    type: 'app',
    defaultX: 50,
    defaultY: 55,
    iconType: 'resume',
    targetWindow: 'about',
  },
  {
    id: 'desk-github',
    title: 'GitHub',
    subtitle: 'eeeunhey',
    type: 'link',
    defaultX: 62,
    defaultY: 55,
    iconType: 'github',
    targetWindow: '',
    externalUrl: 'https://github.com/eeeunhey',
  },
];

interface DesktopIconsProps {
  onOpenWindow: (windowId: string) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenWindow }) => {
  const [offsets, setOffsets] = useState<Record<string, { dx: number; dy: number }>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderIconSvg = (iconType: DesktopItem['iconType']) => {
    switch (iconType) {
      case 'folder':
        return (
          // macOS Big Sur Blue Folder Vector
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
            <defs>
              <linearGradient id="folderBack" x1="34" y1="12" x2="34" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#67B1F3" />
                <stop offset="1" stopColor="#1E80DE" />
              </linearGradient>
              <linearGradient id="folderFront" x1="34" y1="22" x2="34" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7CC2FB" />
                <stop offset="1" stopColor="#2588E5" />
              </linearGradient>
              <filter id="folderDrop" x="4" y="10" width="60" height="54" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0F3865" floodOpacity="0.32" />
              </filter>
            </defs>
            <g filter="url(#folderDrop)">
              {/* Back Tab */}
              <path
                d="M12 18C12 15.7909 13.7909 14 16 14H27.5C29.2 14 30.7 15 31.5 16.5L34 20H52C54.2091 20 56 21.7909 56 24V52C56 54.2091 54.2091 56 52 56H16C13.7909 56 12 54.2091 12 52V18Z"
                fill="url(#folderBack)"
              />
              {/* Paper hint */}
              <rect x="18" y="18" width="32" height="10" rx="2" fill="#EAF4FD" opacity="0.8" />
              {/* Front flap */}
              <path
                d="M11 25C11 22.7909 12.7909 21 15 21H53C55.2091 21 57 22.7909 57 25V52C57 54.2091 55.2091 56 53 56H15C12.7909 56 11 54.2091 11 52V25Z"
                fill="url(#folderFront)"
              />
              <path
                d="M11 25C11 22.7909 12.7909 21 15 21H53C55.2091 21 57 22.7909 57 25V26H11V25Z"
                fill="#A6D7FF"
                opacity="0.6"
              />
            </g>
          </svg>
        );

      case 'yoga':
        return (
          // Mindful Movement / Pilates & Yoga Squircle Icon
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="yogaGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9D4D7" />
                <stop offset="0.5" stopColor="#E0C3FC" />
                <stop offset="1" stopColor="#8EC5FC" />
              </linearGradient>
              <filter id="appDrop" x="0" y="2" width="64" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4A2840" floodOpacity="0.25" />
              </filter>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#yogaGrad)" filter="url(#appDrop)" />
            {/* Meditating Lotus/Figure */}
            <circle cx="32" cy="22" r="5" fill="#4A306D" />
            <path
              d="M32 30C25 30 20 36 20 44C24 43 28 41 32 37C36 41 40 43 44 44C44 36 39 30 32 30Z"
              fill="#4A306D"
            />
            <path
              d="M17 44C22 41 27 40 32 40C37 40 42 41 47 44C42 47 37 48 32 48C27 48 22 47 17 44Z"
              fill="#6A4C93"
              opacity="0.85"
            />
          </svg>
        );

      case 'notes':
        return (
          // macOS Notes Notepad Squircle
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <filter id="notesDrop" x="0" y="2" width="64" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#332A15" floodOpacity="0.22" />
              </filter>
            </defs>
            <rect width="64" height="64" rx="16" fill="#F8E892" filter="url(#notesDrop)" />
            {/* Top yellow header */}
            <path d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V18H0V16Z" fill="#F0C948" />
            {/* Ruled lines */}
            <line x1="8" y1="28" x2="56" y2="28" stroke="#E2C26E" strokeWidth="1.5" />
            <line x1="8" y1="38" x2="56" y2="38" stroke="#E2C26E" strokeWidth="1.5" />
            <line x1="8" y1="48" x2="42" y2="48" stroke="#E2C26E" strokeWidth="1.5" />
            {/* Pen/Pencil tip */}
            <path d="M46 36L52 30L56 34L50 40H46V36Z" fill="#4B382A" />
          </svg>
        );

      case 'ticket':
        return (
          // Conference Pass Ticket
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="ticketGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A6FA0" />
                <stop offset="1" stopColor="#1E3C72" />
              </linearGradient>
              <filter id="ticketDrop" x="0" y="2" width="64" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0A1830" floodOpacity="0.3" />
              </filter>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#ticketGrad)" filter="url(#ticketDrop)" />
            {/* Ticket cutout */}
            <circle cx="32" cy="12" r="4" fill="#EAF4FD" />
            <rect x="14" y="22" width="36" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="14" y="30" width="24" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
            <rect x="14" y="44" width="36" height="8" rx="2" fill="#38EF7D" opacity="0.9" />
            <text x="20" y="50" fill="#0C381E" fontSize="6" fontWeight="bold">TECH PASS</text>
          </svg>
        );

      case 'resume':
        return (
          // ID Card / About Me Badge
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="cardGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#E2E8F0" />
              </linearGradient>
              <filter id="resumeDrop" x="0" y="2" width="64" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.22" />
              </filter>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#cardGrad)" filter="url(#resumeDrop)" />
            {/* Avatar circle */}
            <circle cx="32" cy="24" r="10" fill="#64748B" />
            <circle cx="32" cy="22" r="5" fill="#FFFFFF" />
            <path d="M25 31C25 28 28 26 32 26C36 26 39 28 39 31V34H25V31Z" fill="#FFFFFF" />
            {/* Lines */}
            <rect x="16" y="40" width="32" height="3" rx="1.5" fill="#94A3B8" />
            <rect x="20" y="46" width="24" height="3" rx="1.5" fill="#CBD5E1" />
          </svg>
        );

      case 'github':
        return (
          // GitHub Octocat Squircle
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <filter id="ghDrop" x="0" y="2" width="64" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
              </filter>
            </defs>
            <rect width="64" height="64" rx="16" fill="#181717" filter="url(#ghDrop)" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 16C23.16 16 16 23.16 16 32C16 39.08 20.58 45.06 26.94 47.18C27.74 47.32 28.04 46.84 28.04 46.42C28.04 46.04 28.02 44.78 28.02 43.44C24 44.18 22.96 42.26 22.64 41.36C22.46 40.9 21.68 39.5 21 39.12C20.44 38.82 19.64 38.08 20.98 38.06C22.24 38.04 23.14 39.22 23.44 39.7C24.88 42.14 27.2 41.46 28.12 41.04C28.26 40 28.66 39.32 29.1 38.94C25.54 38.54 21.8 37.16 21.8 31.04C21.8 29.3 22.42 27.86 23.44 26.74C23.28 26.34 22.72 24.7 23.6 22.5C23.6 22.5 24.94 22.08 28.04 24.16C29.32 23.8 30.68 23.62 32.04 23.62C33.4 23.62 34.76 23.8 36.04 24.16C39.14 22.06 40.48 22.5 40.48 22.5C41.36 24.7 40.8 26.34 40.64 26.74C41.66 27.86 42.28 29.28 42.28 31.04C42.28 37.18 38.52 38.54 34.96 38.94C35.5 39.4 35.98 40.32 35.98 41.74C35.98 43.78 35.96 45.42 35.96 45.92C35.96 46.34 36.26 46.84 37.06 46.68C43.42 44.56 48 38.58 48 31.5C48 22.66 40.84 15.5 32 15.5V16Z"
              fill="#FFFFFF"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {DEFAULT_DESKTOP_ITEMS.map((item) => {
        const offset = offsets[item.id] || { dx: 0, dy: 0 };
        const isSelected = selectedId === item.id;

        return (
          <DraggableIconItem
            key={item.id}
            item={item}
            offset={offset}
            isSelected={isSelected}
            onSelect={() => setSelectedId(item.id)}
            onUpdateOffset={(dx, dy) => {
              setOffsets((prev) => ({
                ...prev,
                [item.id]: { dx, dy },
              }));
            }}
            onActivate={() => {
              if (item.type === 'link' && item.externalUrl) {
                window.open(item.externalUrl, '_blank', 'noreferrer');
              } else if (item.targetWindow) {
                onOpenWindow(item.targetWindow);
              }
            }}
            iconSvg={renderIconSvg(item.iconType)}
          />
        );
      })}
    </div>
  );
};

interface DraggableIconItemProps {
  item: DesktopItem;
  offset: { dx: number; dy: number };
  isSelected: boolean;
  onSelect: () => void;
  onUpdateOffset: (dx: number, dy: number) => void;
  onActivate: () => void;
  iconSvg: React.ReactNode;
}

const DraggableIconItem: React.FC<DraggableIconItemProps> = ({
  item,
  offset,
  isSelected,
  onSelect,
  onUpdateOffset,
  onActivate,
  iconSvg,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ sx: 0, sy: 0, initDx: 0, initDy: 0 });
  const totalMoveRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelect();

    isDraggingRef.current = true;
    totalMoveRef.current = 0;
    dragStartRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      initDx: offset.dx,
      initDy: offset.dy,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = moveEvent.clientX - dragStartRef.current.sx;
      const deltaY = moveEvent.clientY - dragStartRef.current.sy;
      totalMoveRef.current = Math.hypot(deltaX, deltaY);
      onUpdateOffset(dragStartRef.current.initDx + deltaX, dragStartRef.current.initDy + deltaY);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalMoveRef.current > 5) return; // Ignore drag release
    onActivate();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: `${item.defaultX}%`,
        top: `${item.defaultY}%`,
        transform: `translate(calc(-50% + ${offset.dx}px), calc(-50% + ${offset.dy}px)) scale(${isHovered ? 1.05 : 1})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '96px',
        padding: '8px 4px',
        borderRadius: '10px',
        background: isSelected ? 'rgba(74, 111, 160, 0.22)' : 'transparent',
        border: isSelected ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
        cursor: 'pointer',
        pointerEvents: 'auto',
        userSelect: 'none',
        transition: isDraggingRef.current ? 'none' : 'transform 0.16s ease, background 0.16s ease',
      }}
      title={`${item.title} — ${item.subtitle}`}
    >
      {/* Icon Graphic */}
      <div style={{ marginBottom: '6px', filter: isHovered ? 'brightness(1.08)' : 'none' }}>
        {iconSvg}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.75), 0 2px 6px rgba(0, 0, 0, 0.5)',
          padding: '2px 6px',
          borderRadius: '4px',
          background: isSelected ? 'rgba(0, 88, 204, 0.8)' : 'rgba(0, 0, 0, 0.18)',
          lineHeight: 1.2,
          wordBreak: 'keep-all',
        }}
      >
        {item.title}
      </span>
      <span
        style={{
          fontSize: '10px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.85)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
          marginTop: '2px',
        }}
      >
        {item.subtitle}
      </span>
    </div>
  );
};
