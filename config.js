import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  LIVEKIT_URL: process.env.LIVEKIT_URL,
  LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET,
  GENESYS_API_KEY: process.env.GENESYS_API_KEY,
  ROOM_NAME: process.env.ROOM_NAME || "support-room",
};