From node:17.8

ADD . /app
WORKDIR /app
RUN npm install -registry=https://e29lwva9.mirror.aliyuncs.com
CMD node App.js