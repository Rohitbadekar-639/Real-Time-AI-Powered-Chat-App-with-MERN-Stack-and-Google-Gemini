import mongoose from "mongoose";

function connect() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not set");
    return;
  }

  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 20000,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}

export default connect;
