FROM node:18.13.0
Run mkdir -p /main.ts
WORKDIR /main.ts
ADD . /main.ts/
RUN npm install --legacy-peer-deps
Run npm run build
EXPOSE 3001
ENTRYPOINT npm run start:prod