/* eslint-disable no-console */

// #region snippet
// Inside ./snippets/external.ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

 const result = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: "Tell me a joke.",
  });

  console.log(result.text);
// #endregion snippet

export function sayHello() {
  console.log('Hello from snippets/external.ts')
}
