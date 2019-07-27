FROM node:10-alpine

COPY . /usr/lib/webapp
RUN cd /usr/lib/webapp && \
    npm install

EXPOSE 3000

WORKDIR /usr/lib/webapp
CMD ["npm", "start"]