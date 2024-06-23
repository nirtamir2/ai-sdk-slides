import { defineConfig } from "vite";

import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    define: {
      // IMPORTANT: Don't deploy to production - because the env variable is exposed to the client
      'process.env.GOOGLE_GENERATIVE_AI_API_KEY': JSON.stringify(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    },
  
});
