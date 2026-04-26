# Student Team Members Management Application

A complete Full Stack Web Application to manage student team members, built with React, Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: React.js, Vite, React Router, Axios
- **Backend**: Node.js, Express, Multer (for file upload)
- **Database**: MongoDB using Mongoose

## Features
- Clean and modern centered UI with basic CSS.
- **Home Page**: Navigation links.
- **Add Member Page**: Form with validation and profile image upload.
- **View Members Page**: Card layout displaying member details and uploaded image.
- **Member Details Page**: Detailed view of a single member.

## Prerequisites
- Node.js (v14+ recommended)
- MongoDB (running locally or remote URI)

## Installation Steps

1. **Clone or unzip the repository.**
2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
3. **Setup the Frontend:**
   ```bash
   cd frontend
   npm install
   ```

## How to Run in VS Code

1. **Open the Project in VS Code:**
   Open the `n:\FSD\CT2` folder in VS Code.

2. **Start the Backend Server:**
   - Open a new terminal in VS Code (`Ctrl + \`` or `Terminal -> New Terminal`).
   - Run the following commands:
   ```bash
   cd backend
   npm start
   # or 'npm run dev' to use nodemon
   ```
   The backend will start on `http://localhost:5000`.

3. **Start the Frontend Application:**
   - Split the terminal or open a second terminal in VS Code.
   - Run the following commands:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:5173` (or another port provided by Vite).

## API Endpoints

- `GET /api/members` : Fetch all team members.
- `GET /api/members/:id` : Fetch details of a specific team member.
- `POST /api/members` : Add a new team member. Requires `name`, `role`, `email`, and an `image` file sent as `multipart/form-data`.

## Project Structure
- `/backend`: Node.js, Express server, Mongoose models, and API routes.
- `/frontend`: React application, Vite config, Components, and Pages.
