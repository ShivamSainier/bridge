import { CONFIG } from "./config.js";
import { IngressClient } from 'livekit-server-sdk';
import { IngressInput } from "livekit-server-sdk";
import { IngressAudioEncoding } from "livekit-server-sdk";

let livekitIngress;

export async function createLiveKitIngress() {
  const ingressClient = new IngressClient(CONFIG.LIVEKIT_API_KEY, CONFIG.LIVEKIT_API_SECRET);

  livekitIngress = await ingressClient.createIngress({
    name: "Genesys Customer",
    roomName: CONFIG.ROOM_NAME,
    inputType: IngressInput.WEBRTC,
    audio: {
      encoding: IngressAudioEncoding.OPUS,
      sampleRate: 48000,
      channels: 1,
    },
  });

  console.log("✅ LiveKit ingress ready:", livekitIngress.url);
  return livekitIngress;
}

export function getLiveKitIngress() {
  if (!livekitIngress) throw new Error("LiveKit ingress not initialized");
  return livekitIngress;
}
