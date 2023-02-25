# createBasicSite

💡 항해 99 미니 프로젝트 D반 1조 팀원들의
미니 프로젝트에 대한 내용을 기입하는 첫 S.A. 페이지 입니다.

<aside>

</aside>
<aside>
    
노션 페이지 https://salt-rondeletia-199.notion.site/99-1-17173d37f64e4580a807b7e2b09358d7

</aside>
## 0. 목차

[**1. 프로젝트 명**]

[**2. 팀원**]

[**3. 소개**]

[**4. 와이어프레임**]

[**5.프로그램 세팅 및 작업**]

[**6. API**]

[**7. 기능구현 분담**]

[**8. 서버와 데이터베이스의 관계도**]

---

## 프로젝트 명

<aside>
💁🏻‍♂️ Create Basic Site

</aside>

## 팀원

<aside>
💁🏻‍♂️ 팀원 목록표

[List](https://www.notion.so/46b6dcfb6633413ab06b629417cd9f13)

</aside>

## 소개

<aside>
💁🏻‍♂️ 기본적인 사이트의 틀을 구현 하는데, 중점을 둔 웹 사이트 입니다.

</aside>

## 와이어프레임

<aside>
📸 해당 웹 사이트 미 지원

</aside>

---

## 프로그램 세팅 및 작업

<aside>
🛠 프로그램 세팅 및 작업

- **GitHub Link**
    
    
- **Stack**
    - 회원가입/로그인
        
        회원가입 (Sign up)
        
        로그인 (Login)
        
    - 게시판
        
        게시글 작성
        
        게시글 조회
        
        게시글 상세 조회
        
        게시글 수정
        
        게시글 삭제
        
    - 코멘트
        
        댓글 작성
        
        댓글 전체 조회
        
        댓글 수정
        
        댓글 삭제
        
    - 좋아요
        
        게시글 좋아요
        
        좋아요 조회
        
    - 로그아웃
        
        로그아웃 (Logout)
        
    
- **ERD**
    
    노션 참조

- **npm**
    
    express
    dotenv
    nodemon 
    cookie-parser
    jsonwebtoken
    sequelize
    mysql2
    bcrypt
    express-async-errors
    express-validator
    morgan
    

- **Code Review Time**
    - 아침조회 (오전 08시)
        
        전일 19시부터 금일 08시까지 구현한 코드 및 기능 전달,
        19시전까지 어떤걸 할건지 전달.
        
    - 일일결산 (오후 19시)
        
        아침조회부터 19시까지 작성한 코드 및 기능구현 전달,
        20시 혹은 21시 쯤에 있는 매니저 순회 전까지 질문할 질문내용을 정리.
        
</aside>

## API

<aside>
📃 API 표

[API](https://www.notion.so/7ae642e963434a6a87c4ba0e21cd9e1e)

</aside>

## **기능구현 분담**

<aside>
🙋🏻‍♂️ **서버** **기능 구현 분담**

- 주재훈
    - CI / CD담당
        - GitHub
            
            commit / push / merge / GitHub Action connect
            
        - GitHub Action
            
            yml file 제작 담당
            
- 정붕기
    - 가상화 담당
        
        Docker
        
- 한창윤
    - 가상화 담당
        
        Docker
        
- 이기웅
    - CI / CD담당
        - GitHub Action
            
            yml file 담당 & Docker Hub 계정 연결 테스트
            
- 조현수
    - 배포담당
        
        Docker - EC2 배포
        
</aside>

<aside>
🙋🏻‍♂️ **프로그램 기능 구현 분담**

- 주재훈
    - 로그아웃 구현
        
        
- 정붕기
    - 게시글 구현
        
        
    - Refactoring
- 한창윤
    - 좋아요 구현
        
        
    - Refactoring
- 이기웅
    - 댓글 구현
        
        
- 조현수
    - 회원가입 구현
        
        
    - 로그인 구현
        
        
    - Refactoring
</aside>

## 서버와 데이터베이스 관계도

<aside>
🔗 서버와 데이터베이스의 관계도

|  |  |
| --- | --- |
| Programming language | JavaScript  |
| Framework | Node.js |
| CICD | GitHub action |
| Container | Docker  |
| DB | MySQL |
| Linux | ubuntu |
| Deploy | AWS EC2 |
| 가상화 기술 | Docker hub |
| 협업 Tool | GitHub |
| Node를 위한 framework | express.js |

설명 이미지 --> 노션 참조

</aside>

.
---
