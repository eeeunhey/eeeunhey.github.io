import React from 'react';
import { CONFERENCES } from '../data/portfolioData';

export const ConferenceModal: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F5F7' }}>
      <div
        style={{
          padding: '16px 28px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#FFFFFF',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1d1d1f' }}>
          🎟️ Tech Conferences & Seminar Passes
        </h2>
        <div style={{ fontSize: '12px', color: '#86868b', marginTop: '2px' }}>
          최신 기술 트렌드와 프론트엔드/AI 커뮤니티 네트워킹 참관 기록
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {CONFERENCES.map((conf) => (
            <div
              key={conf.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: conf.badgeColor,
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: conf.badgeColor }}>
                  {conf.date}
                </span>
                <span style={{ fontSize: '11px', color: '#86868b' }}>📍 {conf.venue}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 4px 0' }}>
                {conf.title}
              </h3>
              <div style={{ fontSize: '12px', color: '#86868b', marginBottom: '14px' }}>
                역할: {conf.role}
              </div>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  color: '#333336',
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase' }}>
                  💡 Key Learning & Insight
                </div>
                {conf.keyTakeaway}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
