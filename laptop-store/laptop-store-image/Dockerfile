FROM ubuntu:20.04

RUN apt-get update

# Install Java.
RUN apt install openjdk-8-jdk openjdk-8-jre -y
RUN apt-get install -y wget && \
  rm -rf /var/lib/apt/lists/*
 
# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

# Install Apache Karaf
ENV KARAF_VERSION 4.2.9
EXPOSE 1099 8101 44444 3306 8080

# COPY karaf.zip /opt
WORKDIR /opt
RUN cd /tmp \
	&& wget -q -O "apache-karaf-${KARAF_VERSION}.tar.gz" "http://archive.apache.org/dist/karaf/${KARAF_VERSION}/apache-karaf-${KARAF_VERSION}.tar.gz" \
	&& tar -zxvf apache-karaf-${KARAF_VERSION}.tar.gz \
	&& mv /tmp/apache-karaf-${KARAF_VERSION} /opt/karaf

# RUN apt-get -y update
# RUN apt-get -y upgrade
RUN chmod 777 /opt/karaf/bin/*
COPY jars/ /opt/karaf/deploy/
COPY org.ops4j.datasource-laptopstore.cfg /opt/karaf/etc
ENTRYPOINT ["/opt/karaf/bin/karaf", "&"]
