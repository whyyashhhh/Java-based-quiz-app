FROM eclipse-temurin:21-jre as runtime

WORKDIR /app

# Copy the packaged jar produced by the Maven build
COPY target/quiz-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
