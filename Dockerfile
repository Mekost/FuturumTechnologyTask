FROM node:22 AS frontend
WORKDIR /app
COPY frontend/ .
RUN npm ci && npm run build

FROM eclipse-temurin:25-jdk
WORKDIR /app
COPY backend/ .
COPY --from=frontend /app/dist src/main/resources/static
RUN ./gradlew bootJar
CMD ["java", "-jar", "build/libs/application-0.0.1-SNAPSHOT.jar"]