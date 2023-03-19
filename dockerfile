FROM node:17

# 앱 폴더 생성
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install -g node-gyp && npm install bcrypt --build-from-source

# 앱 소스 추가
COPY . .

# 포트 열기
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]