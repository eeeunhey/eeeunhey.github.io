import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface Project {
  id: number;
  title: string;
  anchorX: number; // default percentage 0-100
  anchorY: number; // default percentage 0-100
  thumbnail: string;
  subtitle?: string;
  year?: string;
  location?: string;
  description?: string;
  cameraInfo?: string;
  tag?: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "La ou dort l'eau",
    anchorX: 42.75,
    anchorY: 48.5,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260606_153138_ef8b2e9b-3d18-4b75-8df7-5bc6f0f84fca.png&w=1920&q=85',
    subtitle: 'Series on Aquatic Solitude & Fluid Reflections',
    year: '2026',
    location: 'Brittany, France',
    description:
      'A meditative exploration of tidal rhythms and still waters at twilight. Caught between silence and immersion, this series examines the quiet alchemy where sky and sea dissolve into pure tonal gradation.',
    cameraInfo: 'Leica M11-P • Summilux-M 35mm f/1.4 ASPH • ISO 64',
    tag: 'Tidal Rhythm',
  },
  {
    id: 2,
    title: 'Champ Silencieux',
    anchorX: 25,
    anchorY: 28,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_092743_5be19a2a-e188-4bca-9ed6-74049aa3d83b.png&w=1920&q=85',
    subtitle: 'Mist & Minimalist Geometries in the Pastoral North',
    year: '2026',
    location: 'Normandy, France',
    description:
      'Open fields cloaked in morning vapor. The horizon line becomes an imperceptible thread uniting earth and atmosphere, revealing how emptiness holds immense emotional resonance.',
    cameraInfo: 'Hasselblad 907X 100C • XCD 45P f/4 • ISO 100',
    tag: 'Minimalism',
  },
  {
    id: 3,
    title: 'Lisiere',
    anchorX: 21,
    anchorY: 58,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260530_012333_aca09e65-227f-4185-a25f-85191cfac44d.png&w=1920&q=85',
    subtitle: 'Thresholds of Ancient Woods & Human Silence',
    year: '2026',
    location: 'Fontainebleau Forest, France',
    description:
      'The edge of the forest is both a boundary and an invitation. Captured in dappled, cinematic shadows where ancient moss-covered oaks emerge from the gloom.',
    cameraInfo: 'Sony A7R V • FE 50mm f/1.2 GM • ISO 80',
    tag: 'Forestry',
  },
  {
    id: 4,
    title: 'Elan Brut',
    anchorX: 68,
    anchorY: 62,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260527_084631_63ecf071-0fd9-42e3-989a-144728ce8ddb.png&w=1920&q=85',
    subtitle: 'Brutalist Momentum & Basalt Monoliths',
    year: '2026',
    location: 'Vik & Black Sands, Iceland',
    description:
      'Unforgiving winds, tectonic power, and volcanic textures. High-contrast monochromatic and deep slate tones sculpted by glacial rivers and oceanic surges.',
    cameraInfo: 'Leica SL3 • APO-Vario-Elmarit-SL 24-90mm • ISO 100',
    tag: 'Monochrome',
  },
  {
    id: 5,
    title: 'Les Silences Miroirs',
    anchorX: 66,
    anchorY: 20,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_053312_b4d2b145-7bb2-4755-b7a0-79a8e81b1265.png&w=1920&q=85',
    subtitle: 'Specular Architectures & Geometric Stillness',
    year: '2026',
    location: 'Kyoto & Tokyo, Japan',
    description:
      'A poetic dialogue between traditional Japanese architectural shadows and hyper-contemporary glass reflections. Time feels paused in perfect equilibrium.',
    cameraInfo: 'Fujifilm GFX 100 II • GF 45-100mm f/4 R LM OIS WR • ISO 125',
    tag: 'Architecture',
  },
  {
    id: 6,
    title: 'Revolte douce',
    anchorX: 74,
    anchorY: 41,
    thumbnail:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260512_012043_9764f2d0-5c6e-4faa-94a6-a8253df08c5e.png&w=1920&q=85',
    subtitle: 'Soft Rebellion, Warm Grain & Windblown Solitude',
    year: '2026',
    location: 'Luberon, Provence',
    description:
      'Subtle defiance captured in warm amber hues, golden hour breezes, and the lingering presence of quiet human traces in vast landscapes.',
    cameraInfo: 'Contax T3 / Kodak Portra 400 • Carl Zeiss 35mm f/2.8',
    tag: 'Analog Grain',
  },
];

// Position offset map for free placement
interface PositionOffset {
  dx: number;
  dy: number;
}

// Draggable Desktop Project Icon Component
interface DesktopIconProps {
  project: Project;
  offset: PositionOffset;
  onUpdateOffset: (id: number, offset: PositionOffset) => void;
  onOpenModal: (project: Project) => void;
  isActiveModal: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  project,
  offset,
  onUpdateOffset,
  onOpenModal,
  isActiveModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ sx: 0, sy: 0, initDx: 0, initDy: 0, moved: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    dragStartRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      initDx: offset.dx,
      initDy: offset.dy,
      moved: false,
    };
    setIsDragging(true);

    const handleMouseMove = (moveEv: MouseEvent) => {
      const deltaX = moveEv.clientX - dragStartRef.current.sx;
      const deltaY = moveEv.clientY - dragStartRef.current.sy;
      if (Math.hypot(deltaX, deltaY) > 4) {
        dragStartRef.current.moved = true;
      }
      onUpdateOffset(project.id, {
        dx: dragStartRef.current.initDx + deltaX,
        dy: dragStartRef.current.initDy + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (!dragStartRef.current.moved) {
        onOpenModal(project);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: `calc(${project.anchorX}% - 52px)`,
        top: `calc(${project.anchorY}% - 64px)`,
        transform: `translate(${offset.dx}px, ${offset.dy}px) scale(${isDragging ? 1.08 : isHovered ? 1.04 : 1})`,
        zIndex: isDragging ? 35 : isHovered ? 15 : 4,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        transition: isDragging
          ? 'transform 0.05s ease-out'
          : 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease',
        filter: isDragging
          ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))'
          : isHovered
          ? 'drop-shadow(0 12px 24px rgba(0,0,0,0.22))'
          : 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
      }}
    >
      {/* Icon Image Frame */}
      <div
        style={{
          position: 'relative',
          padding: '10px',
          borderRadius: '16px',
          border: isActiveModal
            ? '2px solid rgba(0, 122, 255, 0.9)'
            : isHovered || isDragging
            ? '2px solid rgba(255, 255, 255, 0.45)'
            : '2px solid rgba(255, 255, 255, 0.15)',
          background: isHovered || isDragging
            ? 'rgba(0, 0, 0, 0.28)'
            : 'rgba(0, 0, 0, 0.14)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background 0.2s ease, border-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDragging
            ? '0 0 0 3px rgba(255,255,255,0.4), 0 16px 36px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          draggable={false}
          style={{
            width: '84px',
            height: '84px',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            display: 'block',
            pointerEvents: 'none',
          }}
        />

        {/* Small Tag Pill */}
        {project.tag && (
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              padding: '2px 7px',
              borderRadius: '9999px',
              background: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              pointerEvents: 'none',
            }}
          >
            {project.tag}
          </div>
        )}
      </div>

      {/* Title Label */}
      <div
        style={{
          background: isActiveModal
            ? 'rgb(0, 102, 221)'
            : isHovered || isDragging
            ? 'rgba(0, 102, 221, 0.95)'
            : 'rgba(0, 0, 0, 0.45)',
          padding: '4px 10px',
          borderRadius: '6px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'background 0.18s ease, transform 0.18s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '130px',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '1.3em',
            letterSpacing: '-0.03em',
            color: 'rgb(255, 255, 255)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </span>
      </div>
    </div>
  );
};

// Dock Icon Component
interface DockIconProps {
  label: string;
  iconSrc: string;
  onClick?: () => void;
  href?: string;
  isMinimized?: boolean;
  isAbsorbed?: boolean;
  domRef?: React.Ref<HTMLDivElement>;
}

const DockIcon: React.FC<DockIconProps> = ({
  label,
  iconSrc,
  onClick,
  href,
  isMinimized = false,
  isAbsorbed = false,
  domRef,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      ref={domRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={isAbsorbed ? 'dock-absorbed' : ''}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 12px)',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
          zIndex: 30,
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'white',
            padding: '6px 12px',
            borderRadius: '64px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '-0.04em',
            color: 'black',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
          {/* White CSS triangle */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid white',
            }}
          />
        </div>
      </div>

      {/* Icon Button */}
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '26%',
          overflow: 'hidden',
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.14)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isMinimized ? '0 0 0 2px rgba(255,255,255,0.9)' : 'none',
        }}
      >
        <img
          src={iconSrc}
          alt={label}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </button>

      {/* Minimized Indicator Dot underneath dock icon */}
      {isMinimized && (
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 0 6px rgba(255,255,255,0.85)',
          }}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {content}
      </a>
    );
  }

  return content;
};

// Window Shell (Modal Window with genuine macOS Genie minimize/restore effect)
interface WindowShellProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  isMinimizing?: boolean;
  isRestoring?: boolean;
  targetDockRef?: React.RefObject<HTMLDivElement | null>;
  dockBarRef?: React.RefObject<HTMLDivElement | null>;
  wide?: boolean;
  children: React.ReactNode;
}

const WindowShell: React.FC<WindowShellProps> = ({
  title,
  onClose,
  onMinimize,
  isMinimizing = false,
  isRestoring = false,
  targetDockRef,
  dockBarRef,
  wide = false,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [windowOffset, setWindowOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ sx: 0, sy: 0, ox: 0, oy: 0 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Update target dock coords accurately for genuine suction animation
  useEffect(() => {
    if (!panelRef.current) return;
    const panel = panelRef.current;
    const pRect = panel.getBoundingClientRect();
    const panelCenterX = pRect.left + pRect.width / 2;
    const panelCenterY = pRect.top + pRect.height / 2;

    let targetCenterX = window.innerWidth / 2;
    let targetCenterY = window.innerHeight - 64 - 36; // exact dock vertical center

    if (targetDockRef?.current) {
      const dRect = targetDockRef.current.getBoundingClientRect();
      targetCenterX = dRect.left + dRect.width / 2;
      targetCenterY = dRect.top + dRect.height / 2;
    } else if (dockBarRef?.current) {
      const dRect = dockBarRef.current.getBoundingClientRect();
      targetCenterX = dRect.right - 28;
      targetCenterY = dRect.top + dRect.height / 2;
    }

    const targetX = targetCenterX - panelCenterX;
    const targetY = targetCenterY - panelCenterY;
    const skewDir = targetX > 20 ? '5deg' : targetX < -20 ? '-5deg' : '0deg';
    const tipL = targetX > 20 ? '84%' : targetX < -20 ? '4%' : '44%';
    const tipR = targetX > 20 ? '98%' : targetX < -20 ? '18%' : '56%';

    panel.style.setProperty('--target-x', `${targetX}px`);
    panel.style.setProperty('--target-y', `${targetY}px`);
    panel.style.setProperty('--win-x', `${windowOffset.x}px`);
    panel.style.setProperty('--win-y', `${windowOffset.y}px`);
    panel.style.setProperty('--skew-dir', skewDir);
    panel.style.setProperty('--tip-l', tipL);
    panel.style.setProperty('--tip-r', tipR);
  }, [isMinimizing, isRestoring, targetDockRef, dockBarRef, windowOffset]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: windowOffset.x,
      oy: windowOffset.y,
    };

    const handleMouseMove = (moveEv: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = moveEv.clientX - dragStartRef.current.sx;
      const dy = moveEv.clientY - dragStartRef.current.sy;
      setWindowOffset({
        x: dragStartRef.current.ox + dx,
        y: dragStartRef.current.oy + dy,
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const getAnimationClass = () => {
    if (isMinimizing) return 'genie-minimizing';
    if (isRestoring) return 'genie-restoring';
    return '';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: isMinimizing ? 'none' : 'none',
      }}
    >
      {/* Soft dark backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          pointerEvents: isMinimizing ? 'none' : 'all',
          opacity: isMinimizing ? 0 : mounted ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Inner modal panel (with accurate suction to Dock) */}
      <div
        ref={panelRef}
        className={getAnimationClass()}
        style={{
          width: wide ? '72vw' : '60vw',
          maxWidth: wide ? '860px' : '720px',
          maxHeight: '74vh',
          borderRadius: '22px',
          background: 'white',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          pointerEvents: 'all',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          transformOrigin: 'bottom center',
          transform: !isMinimizing && !isRestoring
            ? `translate(${windowOffset.x}px, ${windowOffset.y}px) ${
                mounted ? 'scale(1)' : 'scale(0.85)'
              }`
            : undefined,
          opacity: !isMinimizing && !isRestoring ? (mounted ? 1 : 0) : undefined,
          transition:
            !isMinimizing && !isRestoring
              ? 'transform 0.38s cubic-bezier(0.34,1.35,0.64,1), opacity 0.28s ease'
              : undefined,
        }}
      >
        {/* Title bar (Draggable) */}
        <div
          onMouseDown={handleTitleBarMouseDown}
          style={{
            height: '42px',
            padding: '0 16px',
            borderBottom: '1px solid rgb(229,229,234)',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            userSelect: 'none',
          }}
        >
          {/* macOS traffic light circles */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Red: Close */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close (닫기)"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgb(253,93,92)',
                cursor: 'pointer',
                transition: 'filter 0.15s ease, transform 0.15s ease',
              }}
            />
            {/* Yellow: Minimize into Dock */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              title="Minimize to Dock (독으로 최소화)"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgb(250,201,0)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, filter 0.15s ease',
              }}
            />
            {/* Green: Zoom */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setWindowOffset({ x: 0, y: 0 });
              }}
              title="Center (중앙 정렬)"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgb(52,199,90)',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Title text */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              color: 'rgb(70, 70, 75)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              flex: 1,
              paddingRight: '36px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Free placement icon offsets: { [projectId]: { dx, dy } }
  const [iconOffsets, setIconOffsets] = useState<Record<number, PositionOffset>>(() => {
    const initial: Record<number, PositionOffset> = {};
    INITIAL_PROJECTS.forEach((p) => {
      initial[p.id] = { dx: 0, dy: 0 };
    });
    return initial;
  });

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Minimized Window State
  const [minimizedProject, setMinimizedProject] = useState<Project | null>(null);
  const [minimizedAbout, setMinimizedAbout] = useState(false);
  const [minimizedNotes, setMinimizedNotes] = useState(false);

  // Animation phase flags
  const [isMinimizingProject, setIsMinimizingProject] = useState(false);
  const [isRestoringProject, setIsRestoringProject] = useState(false);

  const [isMinimizingAbout, setIsMinimizingAbout] = useState(false);
  const [isRestoringAbout, setIsRestoringAbout] = useState(false);

  const [isMinimizingNotes, setIsMinimizingNotes] = useState(false);
  const [isRestoringNotes, setIsRestoringNotes] = useState(false);

  // Dock absorption pop flag
  const [absorbedDockKey, setAbsorbedDockKey] = useState<string | null>(null);

  // References to Dock
  const dockBarRef = useRef<HTMLDivElement>(null);
  const aboutDockRef = useRef<HTMLDivElement>(null);
  const notesDockRef = useRef<HTMLDivElement>(null);
  const projectDockRef = useRef<HTMLDivElement>(null);

  // Update offset for a specific icon (free placement)
  const handleUpdateOffset = useCallback((id: number, offset: PositionOffset) => {
    setIconOffsets((prev) => ({
      ...prev,
      [id]: offset,
    }));
  }, []);

  // Reset icon layout to default
  const handleResetLayout = () => {
    const reset: Record<number, PositionOffset> = {};
    projects.forEach((p) => {
      reset[p.id] = { dx: 0, dy: 0 };
    });
    setIconOffsets(reset);
  };

  // Handlers for Project Minimize / Restore
  const handleMinimizeProject = () => {
    if (!activeProject) return;
    setIsMinimizingProject(true);
    setTimeout(() => {
      setMinimizedProject(activeProject);
      setActiveProject(null);
      setIsMinimizingProject(false);
      setAbsorbedDockKey('project');
      setTimeout(() => setAbsorbedDockKey(null), 350);
    }, 320);
  };

  const handleRestoreProject = (proj: Project) => {
    setActiveProject(proj);
    setMinimizedProject(null);
    setIsRestoringProject(true);
    setTimeout(() => {
      setIsRestoringProject(false);
    }, 340);
  };

  // Handlers for About Minimize / Restore
  const handleMinimizeAbout = () => {
    setIsMinimizingAbout(true);
    setTimeout(() => {
      setMinimizedAbout(true);
      setShowAbout(false);
      setIsMinimizingAbout(false);
      setAbsorbedDockKey('about');
      setTimeout(() => setAbsorbedDockKey(null), 350);
    }, 320);
  };

  const handleRestoreAbout = () => {
    setShowAbout(true);
    setMinimizedAbout(false);
    setIsRestoringAbout(true);
    setTimeout(() => {
      setIsRestoringAbout(false);
    }, 340);
  };

  // Handlers for Notes Minimize / Restore
  const handleMinimizeNotes = () => {
    setIsMinimizingNotes(true);
    setTimeout(() => {
      setMinimizedNotes(true);
      setShowNotes(false);
      setIsMinimizingNotes(false);
      setAbsorbedDockKey('notes');
      setTimeout(() => setAbsorbedDockKey(null), 350);
    }, 320);
  };

  const handleRestoreNotes = () => {
    setShowNotes(true);
    setMinimizedNotes(false);
    setIsRestoringNotes(true);
    setTimeout(() => {
      setIsRestoringNotes(false);
    }, 340);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'white',
      }}
    >
      {/* 1. Background image (Cinematic Full Viewport) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_151236_784929aa-a992-4292-9938-1dd9b5296a29.png&w=1920&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(84,84,84,0) 0%, rgb(0,0,0) 100%)',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Bottom blur layer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '47.375%',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 40%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header / Branding watermark */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '40px',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '-0.03em',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          Eunhye Kim
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            letterSpacing: '-0.02em',
            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          Selected Photographic Works • 2026
        </span>
      </div>

      {/* Top Right Control Pill (Free Placement & Reset Layout) */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          right: '40px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.92)',
            fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#34d399',
              boxShadow: '0 0 8px #34d399',
            }}
          />
          <span>자유 배치 모드: 아이콘을 마우스로 자유롭게 옮길 수 있습니다</span>
        </div>

        <button
          type="button"
          onClick={handleResetLayout}
          title="아이콘 위치 기본값으로 복원"
          style={{
            padding: '8px 14px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: 'white',
            fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s ease, transform 0.15s ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
        >
          배치 초기화
        </button>
      </div>

      {/* 4. Freely Placeable Desktop Project Icons */}
      {projects.map((project) => (
        <DesktopIcon
          key={project.id}
          project={project}
          offset={iconOffsets[project.id] || { dx: 0, dy: 0 }}
          onUpdateOffset={handleUpdateOffset}
          onOpenModal={(p) => {
            if (minimizedProject && minimizedProject.id === p.id) {
              handleRestoreProject(p);
            } else {
              setActiveProject(p);
            }
          }}
          isActiveModal={activeProject?.id === project.id}
        />
      ))}

      {/* 5. Dock bar with Minimized Windows Support */}
      <div
        ref={dockBarRef}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 18px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.22)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* 1. About Me icon */}
        <DockIcon
          domRef={aboutDockRef}
          label="About Me"
          iconSrc="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_151824_5f47765e-d133-4a38-b8bc-d968a07881a3.png&w=1920&q=85"
          isMinimized={minimizedAbout}
          isAbsorbed={absorbedDockKey === 'about'}
          onClick={() => {
            if (minimizedAbout) {
              handleRestoreAbout();
            } else {
              setShowAbout(true);
            }
          }}
        />

        {/* 2. Notes icon */}
        <DockIcon
          domRef={notesDockRef}
          label="Notes"
          iconSrc="https://framerusercontent.com/images/4ar8CL6aUtjymV8jTsXrcPzXCM.svg"
          isMinimized={minimizedNotes}
          isAbsorbed={absorbedDockKey === 'notes'}
          onClick={() => {
            if (minimizedNotes) {
              handleRestoreNotes();
            } else {
              setShowNotes(true);
            }
          }}
        />

        {/* 3. Vertical divider */}
        <div
          style={{
            width: '1px',
            height: '42px',
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '64px',
          }}
        />

        {/* 4. Instagram */}
        <DockIcon
          label="Instagram"
          iconSrc="https://framerusercontent.com/images/Q0Z0p8LOZhN2hJ2arLjEtkqQD0.png"
          href="https://www.instagram.com/"
        />

        {/* 5. X */}
        <DockIcon
          label="X"
          iconSrc="https://framerusercontent.com/images/vjmmhizcqEgw5ZT5SNFQMpxD00.png"
          href="https://www.x.com/"
        />

        {/* 6. Behance */}
        <DockIcon
          label="Behance"
          iconSrc="https://framerusercontent.com/images/edJkRGfjqjPajyxmEgsUCKVgjE.png"
          href="https://www.behance.com/"
        />

        {/* Minimized Project Item in Dock (macOS Dock Window Section) */}
        {minimizedProject && (
          <>
            <div
              style={{
                width: '1px',
                height: '36px',
                background: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '64px',
              }}
            />
            <div ref={projectDockRef}>
              <DockIcon
                label={`Restore: ${minimizedProject.title}`}
                iconSrc={minimizedProject.thumbnail}
                isMinimized={true}
                isAbsorbed={absorbedDockKey === 'project'}
                onClick={() => handleRestoreProject(minimizedProject)}
              />
            </div>
          </>
        )}
      </div>

      {/* PROJECT MODAL WINDOW */}
      {activeProject && (
        <WindowShell
          title={activeProject.title}
          onClose={() => setActiveProject(null)}
          onMinimize={handleMinimizeProject}
          isMinimizing={isMinimizingProject}
          isRestoring={isRestoringProject}
          targetDockRef={projectDockRef}
          dockBarRef={dockBarRef}
          wide={true}
        >
          {/* Hero Image */}
          <div
            style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f4f4f5',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            <img
              src={activeProject.thumbnail}
              alt={activeProject.title}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Project Details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '22px',
                    color: '#111827',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {activeProject.title}
                </h2>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#6b7280',
                  }}
                >
                  {activeProject.subtitle}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    fontWeight: 500,
                  }}
                >
                  {activeProject.year}
                </span>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    fontWeight: 500,
                  }}
                >
                  {activeProject.location}
                </span>
              </div>
            </div>

            <p
              style={{
                margin: '8px 0 0 0',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#374151',
              }}
            >
              {activeProject.description}
            </p>

            {/* Technical Metadata Box */}
            <div
              style={{
                marginTop: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#f9fafb',
                border: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#9ca3af',
                  }}
                >
                  Technical
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#4b5563',
                    fontWeight: 500,
                  }}
                >
                  {activeProject.cameraInfo}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#0066dd',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                onClick={() => window.open(activeProject.thumbnail, '_blank')}
              >
                View High-Res Master ↗
              </div>
            </div>
          </div>
        </WindowShell>
      )}

      {/* ABOUT ME MODAL WINDOW */}
      {showAbout && (
        <WindowShell
          title="About Eunhye"
          onClose={() => setShowAbout(false)}
          onMinimize={handleMinimizeAbout}
          isMinimizing={isMinimizingAbout}
          isRestoring={isRestoringAbout}
          targetDockRef={aboutDockRef}
          dockBarRef={dockBarRef}
          wide={false}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_151824_5f47765e-d133-4a38-b8bc-d968a07881a3.png&w=1920&q=85"
                alt="Eunhye"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                }}
              />
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '22px',
                    color: '#111827',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Eunhye Kim
                </h2>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#0066dd',
                  }}
                >
                  Visual Storyteller & Fine Art Photographer
                </p>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#6b7280',
                  }}
                >
                  Seoul • Paris • Kyoto
                </p>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                lineHeight: 1.65,
                color: '#374151',
              }}
            >
              Working primarily in medium format and digital monochromes, my
              practice investigates the ephemeral architecture of atmosphere,
              water, and meditative geography. I look for the gentle stillness
              buried beneath the noise of modern life.
            </p>

            <div
              style={{
                borderTop: '1px solid #f3f4f6',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#9ca3af',
                }}
              >
                Selected Exhibitions & Honors
              </span>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '18px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#4b5563',
                  lineHeight: 1.7,
                }}
              >
                <li>
                  <strong>2026</strong> — <em>Les Silences Miroirs</em>, Solo
                  Exhibition, Galerie Nuance, Paris
                </li>
                <li>
                  <strong>2025</strong> — <em>Fluid Horizons</em>, Tokyo
                  Photographic Art Museum
                </li>
                <li>
                  <strong>2024</strong> — Hasselblad Masters Finalist (Landscape
                  & Nature)
                </li>
              </ul>
            </div>
          </div>
        </WindowShell>
      )}

      {/* NOTES MODAL WINDOW */}
      {showNotes && (
        <WindowShell
          title="Studio Notes & Field Diary"
          onClose={() => setShowNotes(false)}
          onMinimize={handleMinimizeNotes}
          isMinimizing={isMinimizingNotes}
          isRestoring={isRestoringNotes}
          targetDockRef={notesDockRef}
          dockBarRef={dockBarRef}
          wide={false}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f9fafb',
                border: '1px solid #f3f4f6',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <strong
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#111827',
                  }}
                >
                  On the Quiet Resonance of Fog
                </strong>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#9ca3af',
                  }}
                >
                  June 2026
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#4b5563',
                }}
              >
                Fog doesn't obscure the landscape—it subtracts distraction until
                only the pure volume and weight of the horizon remain. The best
                frames happen when the shutter waits 20 minutes longer than
                impatience dictates.
              </p>
            </div>

            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f9fafb',
                border: '1px solid #f3f4f6',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <strong
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#111827',
                  }}
                >
                  Current Working Tools
                </strong>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#9ca3af',
                  }}
                >
                  Gear Log
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#4b5563',
                }}
              >
                • Leica M11-P with 35mm Summilux (for intuition and instinct)
                <br />
                • Hasselblad 907X 100C with 45P (for meditative, deliberate
                tonality)
                <br />• Gitzo Carbon Series 3 tripod & neutral density filters
              </p>
            </div>
          </div>
        </WindowShell>
      )}
    </div>
  );
}
