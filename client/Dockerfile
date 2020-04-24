FROM node:latest
WORKDIR /app/gui
COPY ./gui .
RUN ls -l
RUN npm set progress=false
RUN npm install
RUN npm install highcharts
RUN npm install highcharts-react-official
RUN npm run build

WORKDIR /app
COPY . .
RUN npm install

WORKDIR /app
CMD ["node", "index.js"]
