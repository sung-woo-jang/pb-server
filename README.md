<div align="center">

# PlavBuds - Backend

![PlavBuds 로고](https://github.com/sung-woo-jang/pb-client/blob/master/public/logo.png?raw=true)

### 지도 기반 웹 맛집 정보 공유 서비스 - 백엔드

## 프로젝트 배경

PlavBuds는 "지도 위에 맛집 정보를 넣는다면 어떨까?"라는 아이디어에서 시작되었습니다. 사용자들이 자신만의 맛집 지도를 만들고, 친구들과 경험을 공유할 수 있는 서비스를 목표로 합니다.

</div>

## 기술 스택

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API Documentation**: Swagger
- **Containerization**: Docker

## 주요 기능

1. **사용자 관리 (User Module)**
    - OAuth 2.0을 이용한 소셜 로그인 (네이버)
    - 프로필 관리 및 수정
    - 사용자 정보 암호화 저장

2. **맛집 정보 관리 및 검색 (Place Module)**
    - 네이버 지역 검색 API를 활용한 맛집 정보 등록
    - 위치 기반 맛집 검색 및 필터링
    - 맛집 상세 정보 제공 (주소, 카테고리, 평점 등)
    - 하이브리드 검색 시스템:
        - 외부 API(Naver)와 내부 데이터베이스 결과 병합
        - 중복 제거 및 관련성 기반 정렬
    - 한글 특화 검색 기능 (es-hangul 라이브러리 활용):
        - 초성 검색 지원
        - 자모 분리를 통한 유사도 검색

3. **리뷰 시스템 (Post Module)**
    - 맛집에 대한 리뷰 작성, 조회, 수정, 삭제
    - 이미지 업로드 기능 (Sharp 라이브러리 활용)
    - 키워드 기반 리뷰 태깅 시스템

4. **소셜 네트워킹 (Follow Module)**
    - 사용자 간 팔로우/언팔로우 기능
    - 팔로워/팔로잉 목록 조회 및 카운트 제공

5. **맛집 찜하기 (Place-Pick Module)**
    - 사용자별 맛집 카테고리 생성 및 관리
    - 카테고리별 맛집 저장 및 메모 기능
    - 사용자별 찜한 맛집 목록 제공

6. **뉴스피드 (Newsfeed Module)**
    - 팔로우한 사용자들의 최근 리뷰 및 활동 조회
    - 인기 있는 맛집 추천 피드 생성

7. **댓글 시스템 (Comment Module)**
    - 리뷰에 대한 댓글 작성, 조회, 수정, 삭제
    - 댓글 페이지네이션 구현

8. **통합 검색 기능 (Search Module)**
    - 맛집, 사용자, 리뷰 등 통합 검색 기능
    - 검색 기록 관리 및 인기 검색어 제공
    - 검색 결과 정확도 향상을 위한 가중치 시스템 적용

9. **좋아요 기능 (Like Module)**
    - 리뷰에 대한 좋아요 토글 기능
    - 사용자별 좋아요한 게시글 목록 제공

10. **타임라인 기능 (Timeline Module)**
    - 사용자별 활동 내역 타임라인 제공

## ERD

![PlavBuds - ERD](https://github.com/sung-woo-jang/pb-server/blob/master/public/erd.png?raw=true)

### [📄 API 명세서](https://documenter.getpostman.com/view/29077275/2sAXqy1ykM)

## 프로젝트 설정 및 실행

### 환경 설정

1. 저장소 클론:
   ```bash
   git clone https://github.com/sung-woo-jang/pb-server.git
   cd pb-server
   ```

### Docker를 이용한 실행

1. Docker 컨테이너 실행:
   ```bash
   docker-compose -f docker-compose.local.yml up -d
   ```

2. 데이터베이스 시드 데이터 주입:
   ```bash
   npm run seed
   ```

3. 개발 서버 시작:
   ```bash
   npm run start:dev
   ```

## API 문서화 전략

PlavBuds 프로젝트는 NestJS의 Swagger 모듈을 활용하여 API 문서를 자동으로 생성합니다. 문서화 전략의 주요 특징은 다음과 같습니다:

1. **모듈화된 Swagger 데코레이터**:
    - 각 API 엔드포인트에 대한 Swagger 데코레이터를 별도의 파일로 분리하여 관리합니다.
    - 예: `GetCommentsSwaggerDecorator`, `CreateCommentSwaggerDecorator` 등

2. **커스텀 데코레이터**:
    - `swaggerBaseApplyDecorator`와 같은 커스텀 데코레이터를 사용하여 여러 Swagger 데코레이터를 조합합니다.

3. **DTO를 활용한 응답 모델링**:
    - `class-transformer`와 `@nestjs/swagger`의 기능을 활용하여 응답 DTO를 정의합니다.
    - 예: `GetCommentsResponseDto`

4. **API 설명**:
    - 각 API 엔드포인트에 대해 `summary`와 `description`을 제공하여 API의 목적과 기능을 명확히 설명합니다.

이러한 접근 방식을 통해 일관성 있고 유지보수가 용이한 API 문서를 자동으로 생성할 수 있습니다. Swagger UI를 통해 생성된 문서는 `http://localhost:8000/docs`에서 확인할 수
있습니다.

## 프로젝트 문서

프로젝트에 대한 더 자세한
정보는 [PlavBuds 프로젝트 위키](https://button-molybdenum-e50.notion.site/PlavBuds-7a648985060e42bc922ff0525b579554)에서 확인할 수
있습니다. 여기에는 프론트엔드와 백엔드 구현 세부사항, 개발 컨벤션, 회고록, 그리고 프로젝트 전반에 걸친 다양한 문서가 포함되어 있습니다.