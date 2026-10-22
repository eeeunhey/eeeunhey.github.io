import React from 'react';

interface ProfileCardProps {
  onOpenAbout: () => void;
  onOpenMovement: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  onOpenAbout,
  onOpenMovement,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '52px',
        left: '32px',
        maxWidth: '460px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        zIndex: 40,
        pointerEvents: 'auto',
      }}
    >
      {/* Avatar Circle with soft border and shadow */}
      <div
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          boxShadow: '0 8px 24px rgba(74, 111, 160, 0.28), 0 0 0 3px rgba(255, 255, 255, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onClick={onOpenAbout}
        title="About Eunhye"
      >
        ✨
      </div>

      {/* Intro Text */}
      <div style={{ color: '#1d1d1f' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: 'rgba(29, 29, 31, 0.65)',
            marginBottom: '4px',
          }}
        >
          AI & Web Developer · Mindful Movement
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.3px',
            marginBottom: '4px',
          }}
        >
          Eunhye (은혜)
        </div>
        <p
          style={{
            margin: '0 0 8px 0',
            fontSize: '12.5px',
            lineHeight: 1.5,
            color: 'rgba(29, 29, 31, 0.78)',
            maxWidth: '360px',
          }}
        >
          지능형 AI 웹 인터페이스와 건강한 신체 정렬을 만드는 마인드풀 무브먼트(필라테스 & 요가)를 탐구합니다.
        </p>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', fontWeight: 650 }}>
          <button
            onClick={onOpenAbout}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#0066cc',
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '0.2px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            MORE ABOUT ME →
          </button>
          <button
            onClick={onOpenMovement}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#437d65',
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '0.2px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            PILATES & YOGA →
          </button>
        </div>
      </div>
    </div>
  );
};
