# Leaderboard Task & React + Node.js App

## Task Objective
Create a system that allows users to:

1. Select one of ten users (or add new users).
2. Claim random points for the selected user.
3. Dynamically display user rankings based on total points.

The backend is built with **Node.js**, and the frontend uses **React.js**.

---

## Features

### User Selection
- Display a list of 10 users.
- Add new users from the frontend, stored in the database.

### Claim Points
- Click **Claim** to award random points (1–10) to the selected user.
- Points are displayed in real-time.

### Leaderboard
- Shows each user’s **name, total points, and rank**.
- Updates dynamically after each claim.

### Claim History
- Stores every claim in the **Claim History Collection**.

---

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Framer Motion, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Notifications:** Sonner (toast)

---

## Backend API

### Auth Routes (`/api/auth`)
| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | `/register`              | Register a new user          |
| POST   | `/login`                 | Login user                   |
| POST   | `/forgot-password`       | Request password reset       |
| POST   | `/reset-password/:token` | Reset password using token   |

### User Routes (`/api/user`) – Protected
| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | `/`                      | Add a new user               |
| POST   | `/claim`                 | Claim random points          |
| GET    | `/leaderboard`           | Get leaderboard              |
| GET    | `/list`                  | Get list of users            |
| GET    | `/me`                    | Get current user profile     |
| GET    | `/history/:userId`       | Get claim history for user   |

> All `/api/user` routes require JWT authentication via the `protect` middleware.

---

## Installation
From the root of the project, run the following command to install dependencies for both frontend and backend:
```
npm i 
```


### Backend
```bash
cd Backend
npm install
```

## Email Configuration (Nodemailer with Gmail)

To send emails (e.g., for password reset), you need a Gmail account and an App Password.

### Steps to Get Email User and App Password

1. **Enable 2-Step Verification** on your Gmail account.
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
3. Select **Mail** as the app and your device (e.g., Other: Node.js app).
4. Copy the generated 16-character App Password.
5. Use the Gmail email and App Password in your `.env` file:

## Environment Variables

Create a `.env` file in the backend folder with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/leaderboard
JWT_SECRET=
EMAIL_SERVICE=gmail
EMAIL_USER=
EMAIL_PASS=
FRONTED_URL=http://localhost:5173
NODE_ENV=production
```

### Go back to root using this cmd 
```
cd ..
```


### Frontend
```bash
cd Frontend
npm install
```

Create a `.env` file in the frontend folder with the following variables:

```
VITE_BACKEND_URL=http://localhost:5000
```
### Go back to root
```
cd ..
npm run dev
```

Open your browser at http://localhost:5173

