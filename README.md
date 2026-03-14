# NeoConnect

NeoConnect is a civic engagement and complaint management platform that enables citizens to submit complaints, track their progress, and participate in public discussions through polls and community interactions.

The platform improves transparency, accountability, and communication between citizens and authorities.
---
## Live Demo

Frontend (Vercel):
```bash
https://neoconnect-opal.vercel.app
```
Backend (Render):
```bash
https://neoconnect-yui5.onrender.com
```

## Images
## Login Page

![Login Page](screenshots/dashboard.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Submit Complaint

![Submit Complaint](screenshots/submit-case.png)
## Demo Accounts

Use the following accounts to explore different roles in the system:

### Staff

- Email: staff@test.com
- Password: 123456

### Secretariat

- Email: secretariat@test.com
- Password: 123456

### Case Manager

- Email: manager@test.com
- Password: 123456
## Features
-Authentication & Security

-JWT-based authentication

-Role-based access control

-Protected routes

-Complaint Management

-Submit complaints

-Generate unique tracking IDs

-Track complaint progress

-Case management dashboard

-Public Participation

-Poll creation and voting

-Public hub for discussions

-Community engagement

-Analytics

-Complaint category analytics

-Department-level insights

-Hotspot analysis

## Tech Stack
Frontend

Next.js

React

TypeScript

Tailwind CSS

Backend

Node.js

Express.js

JWT Authentication

Database

MongoDB Atlas

Mongoose ORM

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

## System Architecture
User
 ↓
Frontend (Next.js - Vercel)
 ↓
REST API
 ↓
Backend (Node.js / Express - Render)
 ↓
Database (MongoDB Atlas)
##Project Structure
neoconnect/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
│
└── README.md
## Installation
Clone the repository
```bash
git clone https://github.com/sheebanadeem/neoconnect.git
cd neoconnect
```
## Backend Setup
```
cd backend
npm install
```
## Create .env file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
## Run backend:
```
npm start
Frontend Setup
cd frontend
npm install
npm run dev
```
Frontend runs on:
```
http://localhost:3000
```
## Future Improvements

AI-based complaint categorization

Real-time notifications

Mobile application

Geo-based complaint heatmaps

Advanced analytics dashboard

# Author

## Sheeba Nadeem

GitHub:
https://github.com/sheebanadeem
