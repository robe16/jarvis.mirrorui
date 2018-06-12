FROM resin/rpi-raspbian:latest
MAINTAINER robe16

# Update
RUN apt-get update \
    && apt-get install -y python3 python3-pip

WORKDIR /jarvis/mirrorui

# Bundle app source
COPY src /jarvis/mirrorui

# Change working directory to accommodate for files inside 'webfiles' folder
WORKDIR /jarvis/mirrorui/webfiles

# Run application
CMD python3 -m http.server
