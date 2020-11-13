FROM ubuntu:20.04

RUN apt-get update

# Install JDK 11
RUN apt install openjdk-11-jdk -y
RUN apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64

EXPOSE 1099 8101 44444 3306 8080 8081 6380