import React, { useState } from 'react';
import { MOVEMENT_DATA, YOGA_CERTIFICATIONS, MovementItem } from '../data/portfolioData';

export const MovementModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pilates' | 'yoga'>('all');
  const [selectedMovement, setSelectedMovement] = useState<MovementItem>(MOVEMENT_DATA[0]);

  const filtered = activeTab === 'all'
    ? MOVEMENT_DATA
    : MOVEMENT_DATA.filter((m) => m.category === activeTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FCFBF9' }}>
      {/* 1. Header Banner: Instructor Bio & Philosophy */}
      <div
        style={{
          padding: '24px 32px 18px 32px',
          background: 'linear-gradient(180deg, #F9F6F0 0%, #FFFFFF 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#5E8B7E',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Mindful Movement · Pilates & Yoga Instructor
            </span>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 750,
                color: '#2C3E35',
                margin: '4px 0 6px 0',
                letterSpacing: '-0.3px',
              }}
            >
              강사 은혜 (Eunhye) — 무브먼트 포트폴리오
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                color: '#556B60',
                lineHeight: 1.6,
                maxWidth: '680px',
              }}
            >
              "정확한 해부학적 정렬(Alignment)과 늑골 호흡을 바탕으로 신체 불균형을 교정하고, 일상의 활력과 깊은 내면의 이완을 회복하는 레슨을 지도합니다."
            </p>
          </div>

          {/* Quick Contact Badge */}
          <div
            style={{
              background: 'rgba(94, 139, 126, 0.1)',
              border: '1px solid rgba(94, 139, 126, 0.25)',
              borderRadius: '12px',
              padding: '10px 16px',
              fontSize: '12px',
              color: '#2C3E35',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '2px' }}>🌿 레슨 및 출강 문의</div>
            <div style={{ color: '#5E8B7E', fontWeight: 600 }}>dmsgp2627@naver.com</div>
          </div>
        </div>

        {/* 2. Certifications Row */}
        <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {YOGA_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.badge}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '6px 14px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: '#5E8B7E',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                {cert.badge}
              </span>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 650, color: '#2C3E35' }}>{cert.title}</span>
                <span style={{ fontSize: '11px', color: '#889890', marginLeft: '6px' }}>({cert.year})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 32px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          background: '#FFFFFF',
        }}
      >
        {[
          { id: 'all', label: '전체 보기 (All Sequences)' },
          { id: 'pilates', label: '필라테스 (Reformer / Cadillac / Chair)' },
          { id: 'yoga', label: '요가 (Hatha & Vinyasa Flow)' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? '#5E8B7E' : 'rgba(0, 0, 0, 0.04)',
                color: isActive ? '#FFFFFF' : '#556B60',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Main Sequence Grid & Active Details */}
      <div
        style={{
          flex: 1,
          padding: '24px 32px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
        }}
      >
        {/* Left: Sequence Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map((item) => {
            const isSelected = selectedMovement.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMovement(item)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid #5E8B7E' : '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 8px 24px rgba(94, 139, 126, 0.18)' : '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: item.category === 'pilates' ? '#5E8B7E' : '#7E6B8F',
                      background: item.category === 'pilates' ? 'rgba(94, 139, 126, 0.1)' : 'rgba(126, 107, 143, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.apparatus || item.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#889890' }}>타겟: {item.focus.slice(0, 18)}...</span>
                </div>

                <div style={{ fontSize: '15px', fontWeight: 700, color: '#2C3E35', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12.5px', color: '#556B60', lineHeight: 1.4 }}>
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Focus & Target Benefits */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '22px',
            height: 'fit-content',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              height: '110px',
              borderRadius: '10px',
              background: selectedMovement.imageGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              marginBottom: '16px',
            }}
          >
            {selectedMovement.category === 'pilates' ? '🧘' : '🌿'}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 800, color: '#5E8B7E', textTransform: 'uppercase', marginBottom: '4px' }}>
            {selectedMovement.apparatus || selectedMovement.category} Sequence
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 750, color: '#2C3E35', margin: '0 0 10px 0' }}>
            {selectedMovement.title}
          </h3>

          <p style={{ fontSize: '13px', color: '#4A5B52', lineHeight: 1.6, marginBottom: '16px' }}>
            {selectedMovement.description}
          </p>

          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '14px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#2C3E35', marginBottom: '8px' }}>
              🎯 시퀀스 기대 효과 (Target Benefits)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedMovement.targetBenefits.map((b, i) => (
                <div key={i} style={{ fontSize: '12.5px', color: '#556B60', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#5E8B7E', fontWeight: 700 }}>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
