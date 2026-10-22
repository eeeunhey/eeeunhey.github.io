import React, { useState, useRef, useEffect } from 'react';

interface MacWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: (winId: string, winEl: HTMLElement) => void;
  onFocus: () => void;
  zIndex: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  width = 920,
  height = 580,
  children,
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const winRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ sx: 0, sy: 0, initX: 0, initY: 0 });
  const isDraggingRef = useRef(false);

  // Center window on initial open
  useEffect(() => {
    if (isOpen && !pos.x && !pos.y) {
      const centerX = Math.max(20, (window.innerWidth - width) / 2);
      const centerY = Math.max(48, (window.innerHeight - height) / 2 - 20);
      setPos({ x: centerX, y: centerY });
    }
  }, [isOpen, width, height, pos.x, pos.y]);

  if (!isOpen && !isMinimized) return null;

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (e.button !== 0) return;
    onFocus();
    isDraggingRef.current = true;
    dragStartRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      initX: pos.x,
      initY: pos.y,
    };

    const handleMouseMove = (me: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = me.clientX - dragStartRef.current.sx;
      const dy = me.clientY - dragStartRef.current.sy;
      setPos({
        x: Math.max(10, Math.min(window.innerWidth - 100, dragStartRef.current.initX + dx)),
        y: Math.max(30, Math.min(window.innerHeight - 100, dragStartRef.current.initY + dy)),
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

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (winRef.current) {
      onMinimize(id, winRef.current);
    }
  };

  const handleZoomClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      ref={winRef}
      id={`mac-window-${id}`}
      onClick={onFocus}
      style={{
        position: 'fixed',
        left: isMaximized ? '12px' : `${pos.x}px`,
        top: isMaximized ? '38px' : `${pos.y}px`,
        width: isMaximized ? 'calc(100vw - 24px)' : `${width}px`,
        height: isMaximized ? 'calc(100vh - 100px)' : `${height}px`,
        maxWidth: 'calc(100vw - 20px)',
        maxHeight: 'calc(100vh - 50px)',
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(36px) saturate(190%)',
        WebkitBackdropFilter: 'blur(36px) saturate(190%)',
        borderRadius: isMaximized ? '14px' : '18px',
        boxShadow:
          '0 28px 72px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.6), 0 4px 16px rgba(0, 0, 0, 0.1)',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex,
        transition: isDraggingRef.current ? 'none' : 'width 0.2s ease, height 0.2s ease, left 0.2s ease, top 0.2s ease',
      }}
    >
      {/* Big Sur Window Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          height: '42px',
          background: 'rgba(246, 246, 246, 0.65)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          userSelect: 'none',
          cursor: isMaximized ? 'default' : 'grab',
          flexShrink: 0,
        }}
      >
        {/* Traffic Lights 🔴🟡🟢 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Close 🔴 */}
          <button
            onClick={onClose}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#FF5F56',
              border: '0.5px solid #E0443E',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#4C0000',
              fontWeight: 800,
            }}
            title="닫기"
          />

          {/* Minimize 🟡 */}
          <button
            onClick={handleMinimizeClick}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#FFBD2E',
              border: '0.5px solid #DEA123',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#5C4400',
              fontWeight: 800,
            }}
            title="최소화 (지니 효과)"
          />

          {/* Zoom 🟢 */}
          <button
            onClick={handleZoomClick}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#27C93F',
              border: '0.5px solid #1AAB29',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#004A0B',
              fontWeight: 800,
            }}
            title={isMaximized ? '이전 크기로 복원' : '전체화면 확대'}
          />
        </div>

        {/* Window Title */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#1d1d1f',
            letterSpacing: '-0.1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {title}
        </div>

        {/* Right balance spacer */}
        <div style={{ width: '52px' }} />
      </div>

      {/* Window Body */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};
