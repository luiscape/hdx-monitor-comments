###################################################################
#                                                                 #
#   Dockerfile for building the HDX Monitor commenting service.   #
#                                                                 #
###################################################################

FROM node:4.2

MAINTAINER Luis Capelo <capelo@un.org>

#
# Clone app and install dependencies.
#
RUN \
  npm install -g pm2 \
  && git clone https://github.com/luiscape/hdx-monitor-comments \
  && cd hdx-monitor-comments \
  && make setup

#
# Install the MongoDB shell
# for configuring the database.
#
RUN \
  apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 \
  && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list \
  && apt-get update \
  && apt-get install -y mongodb-org-shell

WORKDIR "/hdx-monitor-comments"

EXPOSE 8000

CMD ["pm2", "start", "server.js", "--no-daemon"]
