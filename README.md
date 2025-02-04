# Real-Time AI-Powered Chat App with MERN Stack and Google Gemini

## Live Demo -
https://real-time-ai-powered-chat-app-with-mern-stack-and-google-gemini.vercel.app/login

## Project Overview

This project demonstrates how to build a **Real-Time Chat Application** using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js), integrated with **AI capabilities from Google Gemini** for enhanced functionality. It leverages **Redis** for improved performance and utilizes **Socket.IO** for real-time communication. The application is designed to be beginner-friendly while covering advanced features for skill enhancement.

---

## Features

- **User Authentication:** Secure login, registration, and logout functionality.
- **Real-Time Messaging:** Smooth real-time chat with Socket.IO.
- **AI-Powered Tasks:** Integrated AI support using Google Gemini for task handling and content generation.
- **Project Collaboration:** Create and manage projects, add collaborators, and assign tasks.
- **Enhanced UI/UX:** Responsive, interactive UI components for chat, messaging, and project management.
- **File Management:** Includes a file tree structure and code editor with syntax highlighting.
- **Run Functionality:** Integrated web container API for running code within the app.
- **Performance Optimization:** Redis for caching and efficient data handling.
- **Prompt Engineering:** Example prompts for AI and guidance on effective prompt creation.

---

## Project Structure

### Backend

- **Node.js** with **Express.js** for server setup.
- **MongoDB** as the primary database.
- **Redis** for caching and performance optimization.
- **Socket.IO** for real-time communication.
- **Google Gemini API** for AI integration.

### Frontend

- **React.js** for building dynamic and responsive user interfaces.
- **React Router DOM** for navigation.
- **State Management** for seamless message handling and UI updates.

---

## Prerequisites

Before installing, ensure you have the following installed:

- **Node.js** and **npm** (or **yarn**).
- **MongoDB** and **Redis** setup locally or on a cloud platform.
- A valid **Google Gemini API key** for AI integration.

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Backend Setup

1. Navigate to the backend directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend directory and configure the following:

```bash
MONGO_URI=<your_mongo_connection_string>
REDIS_HOST=<your_redis_host>
REDIS_PORT=<your_redis_port>
GOOGLE_GEMINI_API_KEY=<your_gemini_api_key>
```

4. Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

### 4. Test the Application

- Open your browser and navigate to http://localhost:3000 to access the frontend.
- The backend server will be running on http://localhost:5000 by default.

### Key Technologies

- MERN Stack: Full-stack web development.
- Google Gemini: AI-powered features for task automation.
- Socket.IO: Real-time communication.
- Redis: Caching and performance enhancement.
- Web Container API: Running code directly within the application.

### Deployment

To deploy this application, consider:

- Frontend: Netlify or Vercel.
- Backend: Heroku, AWS, or Render.

### Contributing

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature"
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Submit a pull request.

### License

This project is licensed under the MIT License.

### Acknowledgments

- Google Gemini API
- Socket.IO
- Redis
