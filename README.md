# Jokes Challenge

## Overview

This project refactors the [official joke API](https://github.com/15Dkatz/official_joke_api/) with some improvements and added features suggested by the challenge:

- **Refactored the backend** to use **TypeScript**.
- Added new **endpoints** to support:
  - **Rating jokes**.
  - **Removing jokes**.
  - **Adding jokes**.
- **Separation of concerns** to improve maintainability.
- Integrated a **MongoDB** (NoSQL) database to persist new data and functionalities.

The client-side is implemented in both **React** and **Vue**, with **Vite** as the build tool. Both front-end applications are set up to use **TypeScript**.

To run everything locally, I've set up **Docker Compose** to manage the services, including both front-end applications, the server app, and a **Nginx reverse proxy** to handle routing for different services under the same domain.

---

## Features

### Backend
- Refactored API to use **TypeScript**.
- Implemented CRUD operations for jokes:
  - **Add** jokes.
  - **Remove** jokes.
  - **Rate** jokes.
- Persist jokes and ratings in a **MongoDB** database.

### Frontend
- Built two separate front-end applications using:
  - **React** (with Vite).
  - **Vue** (with Vite).
- Both frontends are built with **TypeScript**.

### Docker & Nginx
- **Docker Compose** setup for local development.
- Configured an **Nginx reverse proxy** to manage routing for both front-end apps and the backend.

---

## Running Locally

To get everything running on your local machine, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/kevinjkinder/jokes-app
cd jokes-app
```

### 2. Build and start the services:
```bash
docker-compose up --build
```

Once the services are up, you can access them on:
  - **React FE** http://localhost:8080/jokes-react
  - **Vue FE** http://localhost:8080/jokes-vue

### 3. Stop the services:
```bash
docker-compose down
```

