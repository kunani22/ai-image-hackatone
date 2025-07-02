# 🚀 배포 가이드

## 빠른 배포 (클릭 한 번으로!)

### 1. Vercel 배포 (추천)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-image-generator)

**설정 단계:**
1. 위 버튼 클릭 → GitHub 연결
2. 환경변수 설정:
   - `FAL_API_KEY`: fal.ai API 키
   - `OPENAI_API_KEY`: OpenAI API 키
3. Deploy 클릭!

### 2. Railway 배포
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/ai-image-generator)

**설정 단계:**
1. 위 버튼 클릭 → GitHub 연결
2. Variables 탭에서 환경변수 설정
3. 자동 배포 완료!

### 3. Render 배포
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/your-username/ai-image-generator)

## 📋 배포 체크리스트

### ✅ 배포 전 준비사항
- [ ] GitHub 저장소 생성 및 코드 업로드
- [ ] fal.ai API 키 획득
- [ ] OpenAI API 키 획득
- [ ] 배포 플랫폼 계정 생성

### ✅ 환경변수 설정
모든 배포 플랫폼에서 다음 환경변수를 설정해야 합니다:

```
FAL_API_KEY=121b642e-6652-4b90-a925-30216748a513:27abb8a1eb7f27e2c9bdd9560a11d261
OPENAI_API_KEY=sk-proj-your-openai-key-here
```

## 🌐 배포 플랫폼 비교

| 플랫폼 | 무료 플랜 | 설정 난이도 | 속도 | 추천도 |
|--------|-----------|-------------|------|--------|
| **Vercel** | ✅ 충분 | ⭐⭐⭐⭐⭐ | 🚀🚀🚀 | 🏆 1위 |
| **Railway** | ✅ 제한적 | ⭐⭐⭐⭐ | 🚀🚀 | 🥈 2위 |
| **Render** | ✅ 제한적 | ⭐⭐⭐ | 🚀 | 🥉 3위 |

## 📱 배포 후 확인사항

1. **웹사이트 접속 확인**
2. **이미지 생성 테스트**: "sunset" 입력 후 Enter
3. **프롬프트 증강 확인**: 다양한 키워드로 테스트
4. **모바일 반응형 확인**

## 🔧 트러블슈팅

### 문제: API 키 오류
**해결:** 환경변수가 올바르게 설정되었는지 확인

### 문제: 이미지 생성 실패
**해결:** fal.ai API 크레딧 잔액 확인

### 문제: 프롬프트 증강 안됨
**해결:** OpenAI API 키 권한 및 크레딧 확인

## 📊 모니터링

배포 후 다음을 모니터링하세요:
- **API 사용량**: OpenAI & fal.ai 대시보드
- **서버 로그**: 배포 플랫폼 로그 확인
- **응답 시간**: 사용자 경험 최적화

## 💰 비용 관리

### API 비용 추정
- **OpenAI**: ~$0.001 per request
- **fal.ai**: ~$0.05 per image
- **호스팅**: 대부분 무료 플랜으로 충분

### 비용 절약 팁
1. 캐싱 구현으로 중복 요청 방지
2. Rate limiting으로 남용 방지
3. API 사용량 모니터링 알림 설정