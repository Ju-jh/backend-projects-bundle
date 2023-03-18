# [항해99] 3. 실전 프로젝트 계획표

<aside>
💡 항해 99 미니 프로젝트 D반 1조 팀원들의
실전 프로젝트 코딩 에 대한 내용을 기입하는 S.A. 페이지 입니다.

</aside>

## 0. 목차

**1. 프로젝트 명**

**2. 팀원**

**3. 소개**

**4. 와이어프레임**

**5.프로그램 세팅 및 작업**

**6. API**

**7. 기능구현 분담**

**8. 서버와 데이터베이스의 관계도**

---

## 프로젝트 명

<aside>
💁🏻‍♂️ AMU WIKI (아무 위키)

</aside>

## 팀원

<aside>
💁🏻‍♂️ 팀원 목록표


![화면 캡처 2023-03-18 215303](https://user-images.githubusercontent.com/117289578/226107207-d9e1d31d-ff6d-4c8b-8cec-b86b57883213.png)


</aside>

## 소개

<aside>
💁🏻‍♂️ elasticSearch 를 사용한 NoSQL 기반의 데이터 검색과 
서버 이중화와 보안까지 고려해 설계하여 만든 위키백과의 한 종류 입니다.
그리고, 기존 위키백과 사이트와의 차별점을 둔 부분은 
새로운 위백과 데이터를 import 할 수 있도록 하였습니다.

</aside>

## 와이어프레임

[Amuwiki_와이어프레임_수정본_230317.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1f6ae2f-33f0-4812-a540-c2e29691790e/Amuwiki_%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84_%EC%88%98%EC%A0%95%EB%B3%B8_230317.pdf)

---

## 프로그램 세팅 및 작업

<aside>
🛠 프로그램 세팅 및 작업

- **GitHub Link**
    
    BE: [https://github.com/LKW9/AMU_BE/tree/develop](https://github.com/LKW9/AMU_BE/tree/develop)
    
    FE: [https://github.com/LKW9/AMU_FE/tree/develop](https://github.com/LKW9/AMU_FE/tree/develop)
    

- **Stack**
    
    
    <aside>
    🔗 BackEnd_Stack
    
    | Programming Language | TypeScript  |
    | --- | --- |
    | Framework | Nest.js(express) |
    | CI/CD | GitHub action |
    | Container | Docker  |
    | DB | MongoDB |
    | Linux | Ubuntu |
    | API Document | Swagger |
    | Deploy | AWS EC2 |
    | Virtualization Technology | Docker  |
    | Cooperation Tool | GitHub |
    | RunTime Environment | Node.js |
    | Repository | Github |
    | ElastiCache | Redis |
    | ElasticSearch | Kibana,Search |
    </aside>
    

- **ERD**
    
![drawSQL-amu-wiki-export-2023-03-18](https://user-images.githubusercontent.com/117289578/226107473-80f67de0-9c95-4eef-98ba-865c6753ce24.png)


    

- **npm**
    
    ```json
    "@fastify/cookie": "^6.0.0",
    "@fastify/multipart": "^7.5.0",
    "@nestjs/common": "^9.0.0",
    "@nestjs/config": "^2.3.1",
    "@nestjs/core": "^9.0.0",
    "@nestjs/elasticsearch": "^9.0.0",
    "@nestjs/jwt": "^10.0.2",
    "@nestjs/mongoose": "^9.2.1",
    "@nestjs/passport": "^9.0.3",
    "@nestjs/platform-fastify": "^9.3.9",
    "@nestjs/swagger": "^6.2.1",
    "@types/elasticsearch": "^5.0.40",
    "@types/passport-jwt": "^3.0.8",
    "bcrypt": "^5.1.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "elasticsearch": "^16.7.3",
    "fastify-cookie": "^5.7.0",
    "fastify-multipart": "^5.4.0",
    "fastify-static": "^4.7.0",
    "mongoose": "^6.10.2",
    "nest-fastify-multer": "^1.0.1",
    "nodemailer": "^6.9.1",
    "nodemailer-smtp-transport": "^2.7.4",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.2.0"
    ```
    

- **Code Review Time**
    - 아침조회 (오전 09시)
        
        전일 19시부터 금일 08시까지 구현한 코드 및 기능 전달,
        19시전까지 어떤걸 할건지 전달.
        
    - 중간조회 (오후 04시)
        
        중간 코드리뷰 실행
        
    - 일일결산 (오후 07시)
        
        아침조회부터 19시까지 작성한 코드 및 기능구현 전달,
        20시 혹은 21시 쯤에 있는 매니저 순회 전까지 질문할 질문내용을 정리.
        

</aside>

## API

<aside>
📃 API 표

[API](https://www.notion.so/c87c379c81784e83b29ab59126243748)

</aside>

## **기능구현 분담**

<aside>
🙋🏻‍♂️ 서버 기능 구현 분담

- 이기웅
    - CI / CD
        
        GitHub Action
        
    - 형상 관리
        
        GitHub
        
    - Redis / ElastiCache
- 정붕기
    - 가상화
        
        Docker
        
    - ElasticSearch
- 주재훈
    - MongoDB 관리
        
        
    - Redis / ElastiCache
        
        
    - Nginx
        
        
- 한창윤
    - 가상화
        
        Docker
        
    - MongoDB
    - ElasticSearch
- 조현수
    - 가상화
        
        Docker
        
    - 배포
        
        EC2
        
    - Redis / ElastiCache
        
        
    - Nginx
</aside>

<aside>
🙋🏻‍♂️ 프로그램 기능 구현 분담

- 이기웅
    
    profile 조회
    profile 수정 / nickname 변경 / password 변경
    / profilePhoto 업로드
    / profielPhoto 수정
    
- 조현수
    
    작성한 post 조회
    / post 작성
    / post 수정
    / post 삭제
    
- 주재훈
    
    emailVerifying
    / signup
    / login
    / logout
    / withdrawal
    
- 정붕기
    
    elasticSearch
    
- 한창윤
    
    elasticSearch
    
</aside>

## Stack

![화면 캡처 2023-03-18 215750](https://user-images.githubusercontent.com/117289578/226107736-9a4df7d9-eeba-460a-bcd0-42b440107e63.png)


## Architecture

예정 시안 1

Redis 사용하여 ElasticCache 사용하는 경우

![image](https://user-images.githubusercontent.com/117289578/226107046-321df3d5-4fac-478c-b9c0-25e367202db2.png)


예정 시안 2

Redis 사용하여 ElasticCache 사용하지 않는 경우

![2](https://user-images.githubusercontent.com/117289578/226107053-69dce23f-da9f-4a18-800e-ef4d5c3abcea.png)


---
