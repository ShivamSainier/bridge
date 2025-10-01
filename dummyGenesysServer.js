import WebSocket, { WebSocketServer } from "ws";

// Configuration
const PORT = 8081;
const SAMPLE_RATE = 8000; // 8kHz PCM
const CHUNK_SIZE = 160;   // ~20ms of audio

// Create WebSocket server
const wss = new WebSocketServer({ port: PORT });
console.log(`✅ Dummy Genesys WebSocket server running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("📞 Dummy client connected");

  // Send audio chunks every 20ms
  const interval = setInterval(() => {
    const pcmBuffer = generateFakeAudioChunk();
    const audioBase64 = pcmBuffer.toString("base64");

    const message = JSON.stringify({
      eventName: "stream.audio",
      data: {
        audio: audioBase64,
      },
    });

    ws.send(message);
  }, 20);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("❌ Dummy client disconnected");
  });
});

// Generate fake PCM audio (sine wave)
function generateFakeAudioChunk() {
  const buffer = Buffer.alloc(CHUNK_SIZE * 2); // 16-bit PCM
  const frequency = 440; // A4 note
  for (let i = 0; i < CHUNK_SIZE; i++) {
    const sample = Math.sin((2 * Math.PI * frequency * i) / SAMPLE_RATE) * 32767;
    buffer.writeInt16LE(sample, i * 2);
  }
  return buffer;
}
