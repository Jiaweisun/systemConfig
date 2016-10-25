
FROM kssz/centos-nodejs:6.3.0
MAINTAINER Jiaweisun

ENV KS_PROJECT_NAME configcenter-server
ENV LANG  en_US.UTF-8
COPY server /data/$KS_PROJECT_NAME/
RUN cd /data/$KS_PROJECT_NAME/ && cnpm install && cnpm install felixge/node-mysql
EXPOSE 8080
WORKDIR /data/$KS_PROJECT_NAME
CMD ["node","index"]