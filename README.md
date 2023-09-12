# BE_Projects
Backend Projects Bundle

## Projects

---

## Backend_AmuWiki **(아무위키)**

**직책** : 부팀장

**프로젝트 기간** : 6주(2022.03.09~2023.04.21)

**참여 인원** : 6명 
(Backend 5, Frontend 1)

**ElasticSearch**를 사용한 **NoSQL 기반**의 데이터 검색과 **서버 이중화**와 **로드 밸런싱**, **보안**까지 고려해 설계하여 만든 **위키백과**의 한 종류입니다.

---

- 개발환경
    
    **BE : TypeScript, Node.js, Nest.js(fastify), mongoDB Atlas, 
    EC2, Nginx, Docker, Docker Compose, Github Actions, ElasticSearch, Monstache, 
    Google cloud storage**
    
    FE : TypeScript, Node.js, Tailwind CSS, React, Vite
    
- 서버 담당 역할 [(기여한 부분 Blog URL)](https://jrogrammer.tistory.com/242)
    - **회원가입 API 개발**
        
        무작위로 회원가입 하는것을 방지하는 목적으로 이메일을 통한 가입 로직 구현
        ****→ **인증코드를 발송, 대조하여 회원가입 기능 구현**
        
    - **로그인 API 개발**
        
        위키 정보에 기여(contribute)할 수 있게 회원제를 운영
        ****→ **토큰 기반 인증을 이용하여 유저 혹은 위키정보관리 시스템 구축**
        
    - **회원탈퇴 API 개발**
        
        회원 개인 정보를 삭제하기 희망하는 회원을 위하여 이메일을 통한 회원탈퇴 로직 구현
        ****→ **인증코드를 발송, 대조하여 회원가입 기능 구현**
        
    - **프로필 저장기능 구현**
        
        회원 정보중 프로필 사진을 저장혹은 수정기능 구현
        ****→ **Google cloud storage 를 통해 프로필 사진 저장 시스템 구축**
        
    - **ElasticSearch 활용한 mypost 찾기 기능 구현**
        
        ElasticSearch에 query를 작성 
        
- 인프라 담당 역할 [(기여한 부분 Blog URL)](https://jrogrammer.tistory.com/242)
    - **mongoDB Atlas 관리**
        
        요금제 및 덤프 데이터 삽입 혹은 관리
        ****→ **NamuWiki 덤프 데이터를 활용하여 87만건의 데이터 삽입**
        
    - **AWS EC2 (VPC,네트워크 연결 테스트)**
        
        유료 요금제로 변경전 연결이 되는지 테스트 후 팀원에게 
        VPC, 네트워크 연결 방법 인수인계
        
    - **Nginx 로드밸런싱**
        
        Nginx를 통한 로드밸런싱
        ****→ **Nginx의 conf 파일을 통하여 로드밸런싱**
        
    - **Docker(공동) & Docker-compose**
        
        yml 파일 작성
        
    - **https**
        
        보안 강화를 위해 ssl 인증서를 통한 https로 변경
        

---

- Github : [**AmuWiki(아무위키) Github URL**](https://github.com/lkw9/amu_be)
- Brochure : [AmuWiki(아무위키) Brochure URL](https://www.notion.so/AmuWiki-87-4c216ba5fe50498280e3c6a252286d55?pvs=21)
- Blog 회고 : [AmuWiki(아무위키) Blog 회고 URL](https://jrogrammer.tistory.com/238)

---

## Backend_Dwitter **(트위터 클론코딩)**

**직책** : 팀원

프로젝트 기간 : 1주(2022.03.03~2023.03.09)

참여 인원 : 5명 
(Backend 5)

트위터의 기본적인 기능을 Nest.js기반의 express.js 프레임워크로 만들어진 트위터 클론코딩 (챌린저스)프로젝트입니다.

---

- 개발환경
    
    **BE : TypeScript, Node.js, Nest.js, express.js, MySQL, 
    EC2, Nginx, Docker, Github Actions**
    
- 서버 담당 역할 [(기여한 부분 Blog URL)](https://jrogrammer.tistory.com/228)
    - 트윗 포스트 기능 구현
        
        사용자가 작성한 트위터를 저장하는 기능 구현
        
    - 북마크 기능 구현
        
        다른 사용자의 트윗을 북마크하는 기능 구현
        
- 인프라 담당 역할 [(기여한 부분 Blog URL)](https://jrogrammer.tistory.com/228)
    - Docker
        
        Docker 설치 및 관리
        
    - EC2
        
        AWS EC2 관리
        
    - Nginx
        
        Nginx를 통한 서버의 이중화
        

---

- Github : [Dwitter(트위터 클론코딩) Github URL](https://github.com/goingtodev/CloneCoding_Twitter_BE)
- Brochure : [Dwitter(트위터 클론코딩) Brochure URL](https://www.notion.so/99-2-a0d1e7a7e3f34c67b379b838c1d74741?pvs=21)
- Blog 회고 : [Dwitter(트위터 클론코딩) Blog 회고 URL](https://jrogrammer.tistory.com/228)
