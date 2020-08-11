docker-compose up -d --build

feature:repo-add mvn:org.apache.cxf.karaf/apache-cxf/3.3.7/xml/features
feature:install cxf-jaxrs war hibernate transaction pax-jdbc-mariadb jdbc jpa
bundle:install -s mvn:io.jsonwebtoken/jjwt/0.9.0 mvn:javax.enterprise/cdi-api/2.0.SP1
