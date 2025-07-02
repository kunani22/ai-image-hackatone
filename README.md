# AI Image Generator with FLUX Pro

AI를 활용한 창의적인 이미지 생성 도구입니다. OpenAI GPT-4o-mini로 프롬프트를 자동 증강하고, fal.ai FLUX Pro v1.1 Ultra로 고품질 이미지를 생성합니다.

## ✨ 주요 기능

- 🎨 **AI 프롬프트 증강**: OpenAI가 창의적으로 프롬프트를 확장
- 🖼️ **고품질 이미지 생성**: FLUX Pro v1.1 Ultra 모델 사용
- 🎛️ **인터랙티브 UI**: 클릭으로 편집, 자동 텍스트 색상 조정
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🔒 **보안**: API 키가 서버에서 안전하게 관리

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/ai-image-generator.git
cd ai-image-generator
```

### 2. 환경변수 설정
`.env` 파일을 생성하고 API 키를 설정하세요:

```bash
FAL_API_KEY=your_fal_ai_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 서버 실행
```bash
node api-server.js
```

### 4. 브라우저에서 접속
```
http://localhost:8080
```

## 🔑 API 키 획득 방법

### fal.ai API 키
1. [fal.ai](https://fal.ai) 회원가입
2. Dashboard에서 API 키 생성
3. `.env` 파일에 `FAL_API_KEY` 설정

### OpenAI API 키
1. [OpenAI Platform](https://platform.openai.com) 회원가입
2. API Keys 페이지에서 새 키 생성
3. `.env` 파일에 `OPENAI_API_KEY` 설정

## 💡 사용 방법

1. **이미지 생성**: 텍스트 입력 후 Enter 키
2. **텍스트 편집**: 이미지나 텍스트 클릭
3. **프롬프트 확인**: 우상단 `i` 버튼 클릭
4. **편집 모드 종료**: ESC 키 또는 외부 클릭

## 🏗️ 아키텍처

```
사용자 브라우저 ↔ Node.js API 서버 ↔ OpenAI/fal.ai API
```

- **프론트엔드**: Vanilla JavaScript, HTML5, CSS3
- **백엔드**: Node.js (ES Modules)
- **보안**: 환경변수로 API 키 관리

## 📁 파일 구조

```
├── index.html          # 메인 웹 페이지
├── api-server.js       # API 프록시 서버
├── recoleta-black.otf  # 커스텀 폰트
├── .env               # API 키 (생성 필요)
├── .gitignore         # Git 제외 파일 목록
└── README.md          # 프로젝트 문서
```

## 🛡️ 보안 고려사항

- ✅ API 키가 `.env` 파일에서 관리됨
- ✅ `.gitignore`로 민감한 파일 제외
- ✅ 프론트엔드에서 API 키 완전 제거
- ✅ 서버 프록시를 통한 안전한 API 호출

## 🌐 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경변수 설정
vercel env add FAL_API_KEY
vercel env add OPENAI_API_KEY
```

### Railway 배포
1. [Railway](https://railway.app) 연결
2. GitHub 저장소 연결
3. 환경변수 설정

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🙏 감사인사

- [fal.ai](https://fal.ai) - FLUX Pro 이미지 생성 모델
- [OpenAI](https://openai.com) - GPT-4o-mini 언어 모델
- [Recoleta Font](https://www.fontfabric.com/fonts/recoleta/) - 아름다운 타이포그래피