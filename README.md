# Todo Reastful APIs 

## Introduction
This Todo Application is a simple, yet powerful tool designed to help manage your daily tasks. It's built using Express.js, Prisma, and PostgreSQL, providing a robust backend for handling CRUD operations. Additionally, the app is dockerized for easy setup and deployment.

## Features
- CRUD Operations: **Get by ID**, **Get all items**, **Update**, **Create**, and **Delete** (Soft Delete).
- Docker Setup: Containerized for easy deployment and scalability.
- API Documentation: Accessible through a user-friendly interface (Swagger-UI).

## Requirements
- Docker
- Docker Compose
- Node.js (20.x.x) (for local development)

## Installation and Setup
1- Clone the Repository
```
git clone https://github.com/hamed-farag/todo-resetful-apis.git
```
2- Navigate to the Project Directory
```
cd todo-resetful-apis
```
3- Run Docker Compose:
To build and start the application, use:
```
docker compose up --build
```

## Accessing the Application
- The application will be running at **http://localhost:3000**.
- Access the API documentation at **http://localhost:3000/docs**.
