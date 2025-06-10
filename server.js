import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import matchRoute from "./server/routes/matchRoute.js";
import authRoute from "./server/routes/authRoute.js";
import transcribeRoute from "./api/transcribe/uploadTranscription.js"; // if this exists and is needed

// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", matchRoute);
app.use("/api/auth", authRoute);
app.use("/api/transcribe", transcribeRoute); // keep this only if it's real

// ✅ Add this new upload route correctly
import uploadRoute from "./server/routes/transcribe/uploadRoute.js";
app.use("/api/transcribe", uploadRoute);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

