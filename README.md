# WebProj

## Topic : 음식점 리뷰 및 예약 시스템
### Summary
원하는 음식점을 카테고리별로 검색을 하고 별점 및 리뷰 시스템을 통해서 평가하고 찾을 수 있게 한다. 또한 해당 음식점에 바로 원하는 시간대에 예약을 할 수 있도록 하는 시스템까지 지원할 것이다. 이를 통해 사용자는 어플 하나를 통해 음식점 검색, 예약까지 완료하여 음식점을 가서 식사만 하면 끝나도록 해주는 통합 사이트를 만드는 것이 목표이다.

설치한 npm
```
npm install express mongoose body-parser bcrypt cors ejs dotenv express-async-handler jsonwebtoken express-session connect-mongo
```

### API 엔드포인트
- 음식점 관련:
  - GET /restaurants 음식점 목록 조회
  - GET /restaurants/:id 특정 음식점 상세 정보 조회
- 리뷰 관련:
  - POST /restaurants/:id/reviews 특정 음식점에 리뷰 작성
  - GET /restaurants/:id/reviews 특정 음식점의 리뷰 조회
- 예약 관련:
  - POST /restaurants/:id/reservations 특정 음식점 예약 생성
  - GET /restaurants/:id/reservations 특정 음식점의 예약 가능 시간 조회
