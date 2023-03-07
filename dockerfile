FROM node:18.13.0
WORKDIR /main.ts
ADD . /main.ts/
RUN npm install --legacy-peer-deps
EXPOSE 3001
ENTRYPOINT npm start