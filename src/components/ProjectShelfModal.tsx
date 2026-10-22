import React, { useState } from 'react';
import { REAL_PROJECTS, ProjectItem } from '../data/portfolioData';

export const ProjectShelfModal: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(REAL_PROJECTS[0]);
  const [filterCategory, setFilterCategory] = useState<'All' | 'AI' | 'Web' | 'Fullstack'>('All');

  const filtered = filterCategory === 'All'
    ? REAL_PROJECTS
    : REAL_PROJECTS.filter((p) => p.category === filterCategory || p.tags.includes(filterCategory));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FBFBFD' }}>
      {/* 1. Category Filter Segmented Control */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px 8px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          background: '#ffffff',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          My Shelf ({REAL_PROJECTS.length} Projects)
        </span>

        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            padding: '2px',
            gap: '2px',
          }}
        >
          {(['All', 'AI', 'Web', 'Fullstack'] as const).map((cat) => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#1d1d1f' : '#86868b',
                  boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top "My Shelf" Horizontal Cards Carousel (Reference Style) */}
      <div
        style={{
          padding: '20px 24px',
          overflowX: 'auto',
          display: 'flex',
          gap: '16px',
          background: 'linear-gradient(180deg, #F5F5F7 0%, #ECECED 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.03)',
        }}
      >
        {filtered.map((proj) => {
          const isSelected = selectedProject.id === proj.id;
          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              style={{
                width: '148px',
                height: '180px',
                borderRadius: '14px',
                background: proj.thumbnailGradient,
                flexShrink: 0,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                color: '#ffffff',
                boxShadow: isSelected
                  ? '0 12px 28px rgba(0, 0, 0, 0.28), 0 0 0 3px #0066cc'
                  : '0 4px 12px rgba(0, 0, 0, 0.12)',
                transform: isSelected ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(6px)',
                    textTransform: 'uppercase',
                  }}
                >
                  {proj.category}
                </span>
                {isSelected && (
                  <span style={{ fontSize: '14px', color: '#ffffff' }}>✓</span>
                )}
              </div>

              {/* Card Title & Subtitle */}
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    lineHeight: 1.25,
                    marginBottom: '4px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  }}
                >
                  {proj.title}
                </div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 500,
                    opacity: 0.9,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    lineHeight: 1.2,
                  }}
                >
                  {proj.period}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Middle Divider & Project Header */}
      <div
        style={{
          padding: '16px 28px 12px 28px',
          textAlign: 'center',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: '#0066cc',
          }}
        >
          {selectedProject.category} · {selectedProject.role}
        </span>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 750,
            color: '#1d1d1f',
            margin: '4px 0 2px 0',
            letterSpacing: '-0.3px',
          }}
        >
          {selectedProject.title}
        </h2>
        <div style={{ fontSize: '13px', color: '#86868b', fontWeight: 500 }}>
          {selectedProject.subtitle} · {selectedProject.team} ({selectedProject.period})
        </div>
      </div>

      {/* 4. Bottom Detail Columns (Left: Key Features & Links, Right: Tech Stack & Highlights) */}
      <div
        style={{
          flex: 1,
          padding: '24px 28px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
          background: '#FBFBFD',
        }}
      >
        {/* Left Column */}
        <div>
          <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#86868b', marginBottom: '8px', letterSpacing: '0.4px' }}>
            프로젝트 개요 & 주요 기능
          </h4>
          <p style={{ fontSize: '13.5px', color: '#333336', lineHeight: 1.6, margin: '0 0 16px 0' }}>
            {selectedProject.overview}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {selectedProject.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                <span style={{ color: '#0066cc', fontWeight: 700 }}>•</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {selectedProject.demoUrl && (
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#0066cc',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 650,
                  padding: '7px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(0, 102, 204, 0.3)',
                }}
              >
                <span>Live Demo ↗</span>
              </a>
            )}
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#ffffff',
                color: '#1d1d1f',
                fontSize: '12.5px',
                fontWeight: 650,
                padding: '7px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '1px solid rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>GitHub Code ↗</span>
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '18px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            height: 'fit-content',
          }}
        >
          <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#86868b', marginBottom: '12px', letterSpacing: '0.4px' }}>
            기술 스택 (Tech Stack)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
            {selectedProject.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0066cc',
                  background: 'rgba(0, 102, 204, 0.08)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#86868b', marginBottom: '8px', letterSpacing: '0.4px' }}>
            핵심 성과 & 엔지니어링 포인트
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {selectedProject.highlights.map((hl, i) => (
              <div key={i} style={{ fontSize: '12.5px', color: '#48484a', lineHeight: 1.5 }}>
                ✓ {hl}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
