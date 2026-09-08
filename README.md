# Nexora — Real-Time AI Coding Rooms

Live app: [https://realaichatbotapp.vercel.app](https://realaichatbotapp.vercel.app)

API: [https://real-time-ai-powered-chat-app-with-mern.onrender.com](https://real-time-ai-powered-chat-app-with-mern.onrender.com)

Nexora is a **MERN** workspace for live collaboration. Teams open a room, chat over **Socket.IO**, ask **@ai** to generate a file tree, edit the code, and run it in the browser with **WebContainers**.

This is not a generic chatbot clone. The product is a **shared coding room** with an AI pair programmer.

---

## What you can do

- Create an account (JWT + bcrypt) and stay signed in across refresh
- Create named project rooms and add collaborators
- Chat in real time; messages are stored in MongoDB
- Mention `@ai` to generate an explanation plus a runnable file tree
- Edit files in the room and persist the tree
- Run generated Node apps in the browser (Chromium)

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React, Vite, Tailwind, Socket.IO client, WebContainers |
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT, bcrypt, optional Redis token blacklist |
| AI | OpenAI (`gpt-4o-mini`) with Gemini fallback |
| Deploy | Vercel (frontend) · Render (API) |

---

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Required in `backend/.env`:

```bash
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=long_random_string
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=sk-your-key
```

Put **`OPENAI_API_KEY` only on the server** (local `.env` and Render → Environment). Never add it to the frontend or to GitHub.

Optional: `GOOGLE_AI_KEY` is used only if OpenAI is not set.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000
```

Open [http://localhost:5173](http://localhost:5173).

---

## Production checklist

These are the settings that make the public link work for recruiters:

1. **Render → Environment**
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL=https://realaichatbotapp.vercel.app`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL=gpt-4o-mini` (optional)
2. **MongoDB Atlas → Network Access**  
   Allow `0.0.0.0/0` so Render can connect. If the cluster is paused, resume it.
3. **Vercel → Environment**
   - `VITE_API_URL=https://real-time-ai-powered-chat-app-with-mern.onrender.com`
4. Render free tier sleeps after idle time. The landing page pings `/health` and shows **Waking server…** then **Live**. Wait for Live before signing in.

---

## How AI is wired

1. A user sends a chat message containing `@ai`
2. The Socket.IO server calls `backend/services/ai.service.js`
3. OpenAI (or Gemini) returns JSON: `{ text, fileTree, buildCommand, startCommand }`
4. The room shows the text and mounts the file tree in the editor

That contract is unchanged from the original app, so the Run / editor flow still works.

---

## Project layout

```
backend/     Express API + Socket.IO
frontend/    Vite React app
```

---

## License

MIT
