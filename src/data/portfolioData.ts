export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  team: string;
  description: string;
  tags: string[];
  tech: string[];
  demoUrl?: string;
  githubUrl: string;
  overview: string;
  features: string[];
  highlights: string[];
  thumbnailGradient: string;
  category: 'AI' | 'Web' | 'Fullstack';
}

export const REAL_PROJECTS: ProjectItem[] = [
  {
    id: 'emotion-log',
    title: 'Daily Emotion Log',
    subtitle: '하루 감정 기록 & AI 피드백 서비스',
    period: '2025.12 (5인 팀)',
    role: 'PM / Full-stack',
    team: '5인 팀 프로젝트',
    description: '하루 감정을 기록하고 시각화하는 감정 로그 서비스. Gemini AI 기반 피드백과 패턴 시각화로 자기 이해를 돕는 웹 서비스입니다.',
    tags: ['React', 'TypeScript', 'Gemini AI', 'Flask', 'MariaDB'],
    tech: ['React', 'TypeScript', 'Python Flask', 'MariaDB', 'Google Gemini API', 'Cloudtype'],
    githubUrl: 'https://github.com/eeeunhey/daily-emotion-log',
    overview: '사용자가 하루의 감정을 태그와 메모로 기록하면, Gemini AI가 이를 분석하여 따뜻한 피드백을 제공하고, 날짜별 감정 트렌드를 차트로 시각화합니다.',
    features: [
      '감정 선택 + 자유 메모 입력 UI',
      'Google Gemini API를 통한 감정 분석 및 맞춤형 위로 피드백',
      '날짜별 감정 시각화 (차트 & 타임라인)',
      '세션 리포트 및 주간/월간 감정 트렌드 대시보드',
    ],
    highlights: [
      'PM으로서 5인 팀 일정 조율 및 API 스펙 정의 주도',
      'Gemini API 프롬프트 엔지니어링으로 일관된 톤앤매너 피드백 응답 보장',
      'MariaDB 스키마 설계 및 Cloudtype 클라우드 배포 파이프라인 구축',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    category: 'AI',
  },
  {
    id: 'balance-eat',
    title: 'BalanceEat',
    subtitle: 'AI 맞춤형 식단 관리 & 영양 밸런스',
    period: '2025.10 – 2025.11 (4인 팀)',
    role: 'PO / Frontend Lead',
    team: '4인 팀 프로젝트',
    description: '음식 섭취 기록과 AI 식단 분석을 통해 일상의 균형 잡힌 영양 섭취를 도와주는 웰니스 헬스케어 웹 서비스입니다.',
    tags: ['React', 'TypeScript', 'Gemini AI', 'Nutrition API', 'Figma'],
    tech: ['React', 'TypeScript', 'Gemini AI API', 'Nutrition API', 'Local Storage', 'Tailwind CSS'],
    githubUrl: 'https://github.com/eeeunhey/balanceeat',
    overview: '식단 데이터를 입력하면 식품의약품안전처 영양 DB와 연동하여 칼로리 및 3대 영양소 섭취 비율을 차트로 시각화하고, 부족한 영양소를 채워줄 수 있는 맞춤 식단을 AI로 추천합니다.',
    features: [
      'Nutrition API 기반 30,000+ 식품 영양 정보 실시간 검색',
      'Gemini AI 기반 사용자 신체 조건 맞춤형 식단 추천',
      '일일 권장 섭취량 대비 칼로리/영양소 프로그레스 차트',
      '식단 섭취 기록 및 날짜별 히스토리 캘린더',
    ],
    highlights: [
      'PO로서 기획 및 Figma UI/UX 디자인 시스템 설계',
      '비동기 검색 API 디바운싱(Debounce) 적용으로 네트워크 부하 70% 감소',
      'Local Storage 기반 오프라인 캐싱 및 부드러운 상태 동기화',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    category: 'AI',
  },
  {
    id: 'ascend',
    title: 'Ascend',
    subtitle: 'AI 이력서 코칭 & ATS 키워드 최적화',
    period: '2025.10 – 2025.12 (개인)',
    role: 'Frontend & System Architecture',
    team: '개인 프로젝트',
    description: '이력서 PDF를 업로드하면 AI가 섹션별 점수, 피드백, ATS 키워드 개선안을 제시하는 지능형 이력서 코칭 웹 서비스입니다.',
    tags: ['React', 'TypeScript', 'Puter.js', 'Zustand', 'React Query'],
    tech: ['React', 'TypeScript', 'Vite', 'Puter.js AI API', 'Zustand', 'React Query', 'PDF.js'],
    githubUrl: 'https://github.com/eeeunhey/Ascend',
    overview: '채용 담당자 및 ATS(Applicant Tracking System) 관점에서 구직자의 이력서를 분석하여 직무 적합도 점수와 문장 단위의 구체적인 개선 제안을 실시간으로 제공합니다.',
    features: [
      '이력서 PDF 업로드 및 텍스트/섹션 파싱 (PDF.js)',
      'AI 기반 항목별(경력, 스킬, 프로젝트) 5단계 정량 점수화',
      '직무 필수 키워드 매칭율 및 ATS 키워드 맵 시각화',
      '성과 중심 문장으로 자동 변환해 주는 실시간 리라이팅(Rewriting)',
    ],
    highlights: [
      'Zustand 전역 상태와 React Query를 통한 비동기 상태 분리',
      '클라이언트 사이드 PDF 텍스트 정규화로 서버 부하 없는 빠른 분석 구현',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    category: 'Web',
  },
  {
    id: 'velin-interview',
    title: 'Velin (AI Interview Prep)',
    subtitle: 'STT & 화상 모의 면접 시뮬레이터',
    period: '2025.08 – 2025.11 (팀)',
    role: 'Frontend & WebRTC Integration',
    team: '팀 프로젝트',
    description: '현업 관점의 면접 질문 자동 생성부터 STT 실시간 음성인식, 답변 분석, 세션 리포트까지 제공하는 올인원 인터뷰 준비 솔루션입니다.',
    tags: ['React', 'TypeScript', 'WebRTC', 'STT', 'Recharts', 'Express'],
    tech: ['React', 'TypeScript', 'WebRTC', 'Web Speech API', 'Recharts', 'Node.js Express', 'MongoDB'],
    demoUrl: 'https://ai-interview-prep-3rshahg4n-eunhyes-projects-b3620ae0.vercel.app/',
    githubUrl: 'https://github.com/eeeunhey/MockInterview',
    overview: '카메라와 마이크를 통해 실제 면접과 유사한 환경을 조성하고, 질문별 답변을 실시간 STT로 텍스트화하여 직무 적합성과 어조, 답변 길이를 다각도로 분석합니다.',
    features: [
      '직무 및 경력 맞춤형 면접 질문 자동 생성',
      'Web Speech API 기반 실시간 한국어 STT 음성 인식',
      'WebRTC 비디오 피드백 및 모의 면접 타이머',
      'Recharts 기반 답변 분석 리포트 및 체크리스트 도출',
    ],
    highlights: [
      'WebRTC 스트림과 STT 음성 인식의 프레임 드롭 없는 안정적 동기화 구현',
      '면접 세션 리포트 PDF 출력 기능 지원',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    category: 'Fullstack',
  },
  {
    id: 'resume-builder',
    title: 'ResumeBuilder',
    subtitle: '구조화된 이력서 작성 & 실시간 프리뷰',
    period: '2025.10 – 2025.11 (개인)',
    role: 'Frontend Engineering',
    team: '개인 프로젝트',
    description: '구직자가 섹션별 가이드에 따라 이력서를 체계적으로 작성하고, 실시간 반응형 프리뷰로 즉시 검토할 수 있는 이력서 빌더 웹앱입니다.',
    tags: ['React', 'TypeScript', 'Form Handling', 'UX'],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/eeeunhey/ResumeBuilder',
    overview: '입력 폼과 실시간 이력서 렌더러가 양방향으로 동기화되어 작성 중 언제라도 실제 이력서 출력 형태를 확인할 수 있으며 브라우저 로컬 저장으로 데이터 손실을 방지합니다.',
    features: [
      '경력/학력/스킬/프로젝트 모듈식 섹션 추가 및 정렬',
      '실시간 A4 규격 이력서 렌더링 프리뷰',
      '자동 임시 저장 및 JSON/PDF 내보내기 지원',
    ],
    highlights: [
      '복잡한 다단 폼 유효성 검사 및 키보드 접근성 개선',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    category: 'Web',
  },
  {
    id: 'albait',
    title: 'ALBAIT',
    subtitle: 'Java/Oracle 기반 구인·구직 플랫폼',
    period: '2025.04 – 2025.05 (개인)',
    role: 'Backend Engineering',
    team: '개인 프로젝트',
    description: 'Java와 Oracle DB를 활용해 구인·구직 플랫폼의 핵심 기능(회원/공고/지원 CRUD 및 통계 대시보드)을 구현한 백엔드 실습 프로젝트입니다.',
    tags: ['Java', 'Oracle DB', 'JDBC', 'SQL'],
    tech: ['Java', 'Oracle Database', 'JDBC', 'SQL'],
    githubUrl: 'https://github.com/eeeunhey/ALBAIT',
    overview: '관계형 데이터베이스 정규화 모델링을 기반으로 복수 테이블 조인, 트랜잭션 무결성, 관리자 통계 쿼리를 작성하여 구인·구직 라이프사이클을 완성도 높게 구현했습니다.',
    features: [
      '회원 가입/인증/권한(구직자, 기업, 관리자) 제어',
      '구인 공고 작성, 필터 검색, 지원서 접수 워크플로우',
      '기업별 지원 현황 및 인기 공고 통계 쿼리 최적화',
    ],
    highlights: [
      'JDBC 커넥션 풀링과 SQL 인덱싱을 통한 쿼리 실행 계획 최적화',
    ],
    thumbnailGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    category: 'Fullstack',
  },
];

// Pilates & Yoga Movement Data (강사 채용 공고 지원 전용 데이터)
export interface MovementItem {
  id: string;
  category: 'pilates' | 'yoga' | 'philosophy';
  title: string;
  subtitle: string;
  apparatus?: string;
  focus: string;
  description: string;
  targetBenefits: string[];
  imageGradient: string;
}

export const MOVEMENT_DATA: MovementItem[] = [
  {
    id: 'reformer-spinal',
    category: 'pilates',
    title: 'Reformer Articulation & Core Flow',
    subtitle: '리포머 척추 분절 및 심부 코어 강화 시퀀스',
    apparatus: 'Reformer',
    focus: '척추 정렬, 파워하우스(Powerhouse) 활성화, 늑골 호흡',
    description: '스프링 저항을 이용하여 중력의 압박에서 벗어나 척추 마디마디를 섬세하게 분절하고 골반의 중립을 유지하는 시퀀스입니다. 일상에서 무너진 신체 밸런스를 바로잡습니다.',
    targetBenefits: ['경추·흉추 유연성 증가', '골반 기저근 및 복횡근 인지력 향상', '굽은 어깨·라운드숄더 교정'],
    imageGradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  },
  {
    id: 'cadillac-shoulder',
    category: 'pilates',
    title: 'Cadillac Scapular Stability & Hanging',
    subtitle: '캐딜락 견갑골 안정화 및 흉추 신전 운동',
    apparatus: 'Cadillac / Trapeze Table',
    focus: '상지 안정성, 전거근 강화, 어깨 관절 가동범위 회복',
    description: '타워 바와 스프링을 활용하여 상체를 안정적으로 지지하며 흉곽을 열어주는 신전 동작으로, 현대인의 단축된 흉근을 이완하고 등의 지지력을 강화합니다.',
    targetBenefits: ['승모근 긴장 완화', '호흡 용적 증대', '견관절 충돌 증후군 예방'],
    imageGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    id: 'chair-balance',
    category: 'pilates',
    title: 'Wunda Chair Functional Pelvic Balance',
    subtitle: '체어 기능적 하지 정렬 & 편측 균형 트레이닝',
    apparatus: 'Wunda Chair',
    focus: '좌우 불균형 개선, 둔근 활성화, 발목·무릎 하지 정렬',
    description: '지지 면적이 좁은 체어 위에서 한 발 중심 서기 동작을 통해 골반의 회전 불균형을 즉각 피드백하고, 하지의 미세 근육을 깨워 보행 능력을 개선합니다.',
    targetBenefits: ['O자/X자 다리 변형 예방', '중둔근 강화로 보행 안정성 확보', '고유수용성 감각 증진'],
    imageGradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6cbf5 100%)',
  },
  {
    id: 'hatha-grounding',
    category: 'yoga',
    title: 'Hatha Yoga Mindful Grounding',
    subtitle: '하타 요가 — 호흡과 깊은 정주의 수련',
    focus: '우디야나 반다, 프라나야마 호흡, 정적인 유지와 이완',
    description: '하나의 아사나에 머무는 시간을 길게 가져가며 몸의 저항감을 관찰하고 호흡으로 긴장을 녹여내는 전통 하타 요가 수업입니다.',
    targetBenefits: ['자율신경계 안정(부교감신경 활성)', '근막 깊은 이완', '스트레스 및 불면 완화'],
    imageGradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  },
  {
    id: 'vinyasa-breath',
    category: 'yoga',
    title: 'Vinyasa Dynamic Flow & Alignment',
    subtitle: '빈야사 — 물 흐르듯 이어지는 호흡과 동적 정렬',
    focus: '호흡-동작 일치, 심폐 순환, 전신 유기적 연결성',
    description: '우짜이 호흡의 리듬에 맞춰 끊김 없이 이어지는 시퀀스로 전신의 체온을 올리고 혈액순환을 촉진하며 활기찬 에너지를 채워줍니다.',
    targetBenefits: ['심폐지구력 향상', '체내 노폐물 배출', '집중력 및 신체 자각 극대화'],
    imageGradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
];

export const YOGA_CERTIFICATIONS = [
  {
    title: 'International Pilates Comprehensive Instructor',
    organization: 'Mat, Reformer, Cadillac, Chair, Barrels 통합 지도자 과정 이수',
    year: '2025',
    badge: 'Comprehensive',
  },
  {
    title: 'Yoga Alliance RYT 200 지도자 자격',
    organization: '전통 하타 요가 및 빈야사 수련 / 프라나야마 호흡법 지도',
    year: '2024',
    badge: 'RYT 200',
  },
  {
    title: '기능해부학 & 체형분석 운동처방 수료',
    organization: '골반 부정렬 및 상하지 관절 가동성 회복 트레이닝',
    year: '2025',
    badge: 'Anatomy',
  },
];

// Study Logs (학습 기록)
export interface StudyLogItem {
  id: string;
  date: string;
  title: string;
  category: string;
  summary: string;
  bullets: string[];
}

export const STUDY_LOGS: StudyLogItem[] = [
  {
    id: 'docker-containers',
    date: '2025-08-29',
    title: 'Docker 컨테이너화 & 멀티스테이지 빌드 최적화',
    category: 'DevOps / Infra',
    summary: '프론트엔드 React 앱과 Nginx 프록시를 결합하여 배포 이미지 용량을 85% 절감한 과정과 로컬 Docker 환경 구축 회고',
    bullets: [
      'Alpine 기반 Node 환경에서 정적 에셋 빌드 후 경량 Nginx 컨테이너로 복사',
      'docker-compose를 이용한 프론트엔드와 백엔드 네트워크 분리 및 로컬 컨테이너 가상화',
    ],
  },
  {
    id: 'react-state-architecture',
    date: '2025-08-25',
    title: 'Zustand vs React Query: 클라이언트/서버 상태 분리 원칙',
    category: 'Frontend Architecture',
    summary: 'UI 상태(모달, 테마, 드롭다운)와 서버 캐시 데이터(API 페칭, 재시도, 무효화)의 명확한 경계 수립 및 리렌더링 최소화',
    bullets: [
      '불필요한 prop drilling 제거 및 Zustand 슬라이스 패턴을 통한 모듈화',
      'QueryKey 팩토리 패턴을 적용해 캐시 무효화 범위 정밀 제어',
    ],
  },
  {
    id: 'ai-prompt-engineering',
    date: '2025-08-20',
    title: 'Gemini AI API 프롬프트 엔지니어링 & JSON 스키마 강제화',
    category: 'AI Integration',
    summary: '자유 텍스트 모델의 환각(Hallucination)을 제어하고, 신뢰성 있는 구조화된 JSON 응답을 얻기 위한 Few-shot 시스템 프롬프트 기법',
    bullets: [
      '시스템 인스트럭션에 응답 DTO JSON 스키마를 명시하고 검증 로직 연결',
      '토큰 소비량 최적화 및 에러 폴백(Fallback) 방어 코드 구축',
    ],
  },
];

// Conference Logs (컨퍼런스 참관기록)
export interface ConferenceItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  role: string;
  keyTakeaway: string;
  badgeColor: string;
}

export const CONFERENCES: ConferenceItem[] = [
  {
    id: 'google-io-extended',
    title: 'Google I/O Extended Seoul',
    date: '2025.07',
    venue: 'Google for Startups Campus',
    role: '참가자 & 세션 청취',
    keyTakeaway: '온디바이스 AI(Gemini Nano)와 웹 표준 WebGPU 연동의 미래, 프론트엔드 엔지니어의 AI 에이전트 오케스트레이션 역할에 대한 인사이트 습득',
    badgeColor: '#4285F4',
  },
  {
    id: 'feconf-2025',
    title: 'FEConf 2025 (프론트엔드 컨퍼런스)',
    date: '2025.10',
    venue: '세종대학교 광개토관',
    role: '참가자 & 기술 네트워킹',
    keyTakeaway: '대규모 웹 애플리케이션의 렌더링 성능 프로파일링 기법과 컴포넌트 아일랜드(Island Architecture) 패턴 학습',
    badgeColor: '#00C7AE',
  },
  {
    id: 'aws-summit-seoul',
    title: 'AWS Summit Seoul — Cloud & GenAI',
    date: '2025.05',
    venue: 'COEX Hall D',
    role: '테크 세션 및 전시 부스 탐방',
    keyTakeaway: '클라우드 인프라와 서버리스 아키텍처, 생성형 AI를 활용한 실시간 사용자 경험 혁신 사례 분석',
    badgeColor: '#FF9900',
  },
];
