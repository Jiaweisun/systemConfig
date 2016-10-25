
FROM kssz/centos-nodejs:6.3.0
MAINTAINER chenyongbing

ENV KS_PROJECT_NAME configcenter-client
ENV LANG  en_US.UTF-8
COPY client /data/$KS_PROJECT_NAME/
RUN cd /data/$KS_PROJECT_NAME/ && cnpm install
EXPOSE 80
WORKDIR /data/$KS_PROJECT_NAME
CMD ["npm","run","pro"]