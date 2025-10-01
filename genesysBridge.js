// import WebSocket from "ws";
// import { OpusEncoder } from "@discordjs/opus";
// import { CONFIG } from "./config.js";
// import { getLiveKitIngress } from "./livekitIngress.js";

// const encoder = new OpusEncoder(48000, 1);

// export function startGenesysBridge() {
//   const genesysWs = new WebSocket("wss://streaming.genesyscloud.com/v2/audiohook", {
//     headers: {
//       Authorization: `Bearer ${CONFIG.GENESYS_API_KEY}`,
//     },
//   });

//   genesysWs.on("open", () => console.log("✅ Connected to Genesys AudioHook"));

//   genesysWs.on("message", (msg) => {
//     const event = JSON.parse(msg.toString());
//     if (event.eventName === "stream.audio") {
//       const pcmAudio = Buffer.from(event.data.audio, "base64");
//       forwardToLiveKit(pcmAudio);
//     }
//   });

//   genesysWs.on("close", () => console.log("❌ Genesys AudioHook disconnected"));
//   genesysWs.on("error", (err) => console.error("Genesys WS error:", err));
// }

// function forwardToLiveKit(pcmBuffer) {
//   try {
//     const opusData = encoder.encode(pcmBuffer);
//     const ingress = getLiveKitIngress();
//     ingress.sendAudio(opusData);
//   } catch (err) {
//     console.error("Error sending audio to LiveKit:", err);
//   }
// }


import WebSocket from "ws";
import pkg from "@discordjs/opus";

import { getLiveKitIngress } from "./livekitIngress.js";

const { OpusEncoder } = pkg;


const encoder = new OpusEncoder(48000, 1);



// Use dummy server URL
const DUMMY_GENESYS_URL = "ws://localhost:8081";

export function startGenesysBridge() {
  const genesysWs = new WebSocket(DUMMY_GENESYS_URL);

  genesysWs.on("open", () => console.log("✅ Connected to Dummy Genesys server"));

  genesysWs.on("message", (msg) => {
    const event = JSON.parse(msg.toString());
    if (event.eventName === "stream.audio") {
      const pcmAudio = Buffer.from(event.data.audio, "base64");
      forwardToLiveKit(pcmAudio);
    }
  });

  genesysWs.on("close", () => console.log("❌ Dummy server disconnected"));
  genesysWs.on("error", (err) => console.error("WS error:", err));
}

function forwardToLiveKit(pcmBuffer) {
  try {
    const opusData = encoder.encode(pcmBuffer);
    const ingress = getLiveKitIngress();
    ingress.sendAudio(opusData);
  } catch (err) {
    console.error("Error sending audio to LiveKit:", err);
  }
}
