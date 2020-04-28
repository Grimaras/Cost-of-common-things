FROM node:latest
WORKDIR /app/gui
COPY ./gui .
RUN ls -l
RUN npm set progress=false
RUN npm install
RUN npm run build

WORKDIR /app
COPY . .
RUN npm install

WORKDIR /app
CMD ["node", "index.js"]
