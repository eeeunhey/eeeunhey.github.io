import React from 'react';

export const AboutModal: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          padding: '24px 32px 18px 32px',
          background: 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            boxShadow: '0 4px 14px rgba(74, 111, 160, 0.25)',
          }}
        >
          ✨
        </div>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0066cc', textTransform: 'uppercase' }}>
            Profile & Resume
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 750, color: '#1d1d1f', margin: '2px 0 4px 0' }}>
            은혜 (Eunhye)
          </h2>
          <div style={{ fontSize: '13px', color: '#555558' }}>
            Frontend & AI Developer · Certified Pilates & Yoga Instructor
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>
              👋 Introduction
            </h3>
            <p style={{ fontSize: '13.5px', color: '#333336', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              사용자에게 직관적인 인터랙션과 즐거운 사용 경험을 주는 지능형 웹 애플리케이션을 개발합니다.
              React, TypeScript, AI API(Gemini), WebRTC를 바탕으로 실시간 협업과 시각화 서비스를 제작해 왔으며,
              동시에 필라테스와 요가를 통해 신체 정렬과 회복의 가치를 전달하는 강사로서의 정체성을 함께 키워나가고 있습니다.
            </p>

            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>
              📬 Contact & Channels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div>📧 Email: <a href="mailto:dmsgp2627@naver.com" style={{ color: '#0066cc', textDecoration: 'none' }}>dmsgp2627@naver.com</a></div>
              <div>🐙 GitHub: <a href="https://github.com/eeeunhey" target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>https://github.com/eeeunhey</a></div>
              <div>🌐 Portfolio: <a href="https://eeeunhey.github.io" target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>https://eeeunhey.github.io</a></div>
            </div>
          </div>

          <div
            style={{
              background: '#F9F9FB',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1f', marginBottom: '12px' }}>
              💻 Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Python Flask', 'MariaDB', 'Gemini AI API', 'WebRTC', 'Docker'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#0066cc',
                    background: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 102, 204, 0.2)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#2C3E35', marginBottom: '12px' }}>
              🌿 Movement Qualifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#4A5B52' }}>
              <div>• International Pilates Comprehensive Instructor</div>
              <div>• Yoga Alliance RYT 200 지도자 자격</div>
              <div>• 기능해부학 & 체형교정 운동처방 수료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
