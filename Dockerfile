FROM resin/rpi-raspbian:latest
MAINTAINER robe16

# Update
RUN apt-get update \
    && apt-get install -y python3 python3-pip

WORKDIR /jarvis/mirrorui

# Bundle app source
COPY src /jarvis/mirrorui

# Run application
CMD python3 -m http.server
