FROM maven:3.9-eclipse-temurin-21 AS builder
LABEL authors="Oleksandr Savchenko"
WORKDIR /noteManager

COPY pom.xml .
COPY src ./src

RUN mvn clean package

FROM eclipse-temurin:21-jdk-jammy
WORKDIR /noteManager

COPY --from=builder /noteManager/target/*.jar noteManager.jar

ENTRYPOINT ["java", "-jar", "noteManager.jar"]