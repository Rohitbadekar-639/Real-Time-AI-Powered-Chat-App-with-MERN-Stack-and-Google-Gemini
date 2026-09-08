export const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://realaichatbotapp.vercel.app",
  "https://real-time-ai-powered-chat-app-with-mern-stack-and-google-gemini.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
].filter(Boolean);

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
