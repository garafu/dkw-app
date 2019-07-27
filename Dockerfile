FROM node:10-alpine

COPY . /usr/lib/webapp
RUN cd /usr/lib/webapp && \
    mv docker-entrypoint.sh /usr/local/bin && \
    yarn install --ignore-optional

EXPOSE 3000

WORKDIR /usr/lib/webapp
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD ["npm", "start"]