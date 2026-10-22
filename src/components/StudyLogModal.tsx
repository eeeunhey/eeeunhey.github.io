import React from 'react';
import { STUDY_LOGS } from '../data/portfolioData';

export const StudyLogModal: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 28px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#F9F9FB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1d1d1f' }}>
            📓 Daily Study Log & Engineering Notes
          </h2>
          <div style={{ fontSize: '12px', color: '#86868b', marginTop: '2px' }}>
            지속적인 학습과 문제 해결 과정을 기록한 기술 아카이브
          </div>
        </div>
        <a
          href="https://github.com/eeeunhey/A_MyPortfolio/tree/main/STUDY_LOG"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '12px',
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          전체 마크다운 보기 (GitHub) →
        </a>
      </div>

      {/* Logs List */}
      <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {STUDY_LOGS.map((log) => (
            <div
              key={log.id}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                padding: '18px 22px',
                background: '#FAFAFC',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#B25E00',
                    background: '#FFF3E0',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {log.category}
                </span>
                <span style={{ fontSize: '12px', color: '#86868b' }}>📅 {log.date}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 6px 0' }}>
                {log.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#48484a', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                {log.summary}
              </p>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  핵심 배움 & 해결 포인트
                </div>
                {log.bullets.map((b, i) => (
                  <div key={i} style={{ fontSize: '12.5px', color: '#1d1d1f', lineHeight: 1.5, display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#0066cc' }}>•</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
