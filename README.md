# Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse and manage jobs.

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication


# Features

* User Signup & Signin
* JWT Authentication
* Create Service Requests
* View All Jobs
* View Single Job Details
* Edit Job
* Update Job Status
* Delete Job
* Category Filtering
* Status Filtering

---

# Project Structure

```bash
Service Request Board/
│
├── frontend/
├── backend/


---

# Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Run backend server

```bash
node server.js
```

## Backend Running On

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

## Frontend Running On

```bash
http://localhost:5173
```

---

# MongoDB

This project uses MongoDB database connection.

Example MongoDB connection:

```js
mongoose.connect("your_mongodb_connection");
```

---

# Authentication

JWT Authentication is implemented for:

* User Signup
* User Signin
  
JWT tokens are generated after successful login and used for user authentication.

---

# API Endpoints

## Jobs

### Get All Jobs

```bash
GET /api/jobs
```

### Get Single Job

```bash
GET /api/jobs/:id
```

### Create Job

```bash
POST /api/jobs
```

### Update Job Status

```bash
PUT /api/jobs/:id/status
```

### Edit Job

```bash
PUT /api/jobs/:id
```

### Delete Job

```bash
DELETE /api/jobs/:id
```

---

# Author

Developed for the GlobalTNA Full-Stack Developer Intern Technical Assessment.
