import { createLiveKitIngress } from "./livekitIngress.js";
import { startGenesysBridge } from "./genesysBridge.js";

async function main() {
  await createLiveKitIngress();
  startGenesysBridge();
};

main().catch((err) => console.error("Server error:", err));
