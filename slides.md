---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides, markdown enabled
title: Adding AI Capabilities to React Apps with Vercel AI SDK
# apply any unocss classes to the current slide
class: text-center
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
hideInToc: true
---
<!-- NOTE: ⌘ Command + Brightness Down to toggle screen mirroring -->
<!-- TODO: to configure shortcut to open chrome canary -->
<!-- TODO: Close all windows with right control + K -->
<!-- TODO: Make sure your arc browser profile is okay -->
<!-- TODO: Make IDE in presentation mode and move IDE terminal to the right -->
<!-- TODO: Make sure presentation theme is visible -->

# Adding AI Capabilities to React Apps with Vercel AI SDK

<div class="pt-12">
  <span  class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Nir Tamir
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/nirtamir2/ai-sdk-slides" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--

I'm exciting to be here and talk in JavaScript Israel meetup.
The subject of AI is very new and it brings a lot of new ideas and possibilities.
Nowadays we can build things that we wouldn't believe possible in the past with the power of AI.
It's defenatelly a revolution. I'm goint to speak about how to add AI capabilities to your app practically.
-->

---

<Toc minDepth="1" maxDepth="2"></Toc>

---
title: About me
layout: image-right
image: ./nirtamir.png
---

# Nir Tamir 

- Senior Frontend developer
- Work at my own company helping early stage startups
- Loves open source and tooling
- <mdi-web /> [nirtamir.com](https://nirtamir.com)
- <mdi-github /> [@nirtamir2](https://github.com/nirtamir2)
- <mdi-twitter /> [@NirTamir](https://twitter.com/NirTamir)
- <mdi-linkedin /> [@nirtamir2](https://linkedin.com/in/nirtamir2)


---
transition: fade-out
layout: quote
class: text-center text-balance
---

# You don't need to be a Data Scientist to be an AI Engineer

<!-- First, don't worry. You don't need to be a Data Scientist to be an AI Engineer.  -->

---
transition: fade-out
level: 2
---
# AI Engineer

<a href="https://www.latent.space/p/ai-engineer">The Rise of the AI Engineer</a>

![Swyx AI engineer](swyx-ai-engineer.jpeg)

High level - in the right side of the API

<!--
This graph shows what exactly is an AI Engineer. It basically sits in the other side of the API. Someone already train the AI model, and he is using it to do the work. He tie all the things together and using the high level building blocks. No need to train data. Just call models and get the results.


The webpage describes the rise of a new role called the "AI Engineer" - software engineers who specialize in applying AI through tools and APIs, rather than training models. This new discipline will be the highest-demand engineering job of the decade, as AI Engineers leverage both human-written and AI-generated code to build innovative AI-powered applications.
-->

---
transition: fade-out
level: 2
---
# AI Engineer Skills

<a href="https://www.latent.space/p/hiring">Hiring AI Engineer</a>

![ai-engineer-skills](ai-engineer-skills.png)

---
layout: cover
background: ./cruise.png
---

# My journey

<!--
I travel the world recently, and took a cruise to the USA for the first time. In the cruise there is no internet (the internet costs more than the cruise). No Google. So I use open download open source AI models and run them locally on my computer to have ChatGPT "like" access offline. It help me a lot in the planning of the trip.
-->

---
layout: cover
background: ./ollama.png
title: Ollama
image: ./ollama.png
---
# Ollama

Run open source AI models locally

<!-- I think Ollama is the best way you can run local open source models on your computer, offline, but it also enables a whole ecosystem of other applications  -->

---
level: 2
layout: image-right
image: ./ollama.png
layoutClass: gap-16
---
# Ollama

https://ollama.com/

<v-clicks>

- Enable running open source AI models locally
- Works offline
- [Open source](https://github.com/ollama/ollama)
- Free
- CLI
- [Vision models](https://ollama.com/blog/vision-models)
- Integrations [Copilot](https://ollama.com/blog/continue-code-assistant), [Apps](https://github.com/nirtamir2/fixkey-electron), [Zed](https://twitter.com/zeddotdev/status/1803535891584999438), Scripts...
- [Local](http://localhost:3080/) [Open WebUI](https://github.com/open-webui/open-webui)
- REST API
- [Ollama SDK](https://github.com/ollama/ollama-js)

</v-clicks>

<!-- http://localhost:3080/ to open ollama web ui --> 
<!-- The cool thing about Ollama beside the option to run modles locally is the opertunities it brings to 3rd party applications. I see more and more applications that provides Ollama integrations. It's a gift to the open source community. -->

---
level: 2
---
# Calling Ollama via REST API

It has the same structure as OpenAI API hosted at http://localhost:11434

```js {monaco-run} {autorun:false}
const response = await fetch("http://localhost:11434/v1/chat/completions", {
  method: "POST",
  body: JSON.stringify({
    model: "llama3",
    messages: [
      { role: "system", content: "You are a helpful assistant."},
      { role: "user", content: "Hello!"}
    ]}),
});
const data = await response.json();
console.log(data);
```

<!-- Ollama expose a REST API endpoint with the same API of OpenAI, so it can integrate with many tools. Just replace opanAI with ollama base url. In this example we are using the completion endpoint to just answer an answer instead of having a chat. We provide system message that is not visible to the user and define context, tone personalitty and rules of the AI. And we provide user message. Here is the result. There are 2 options - the completions / chat options. Completion is for a single question that does not care about history, while chat remembers context and history and used for multiple messages. -->

---
level: 2
---
# Calling Ollama via SDK
https://github.com/ollama/ollama-js
````md magic-move
```js
import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)
```

```js
import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  stream: true,
})
for await (const part of response) {
  console.log(part.message.content)
}
```
````

<!-- We can convert it to call Ollama via sdk which is easier.
And we can add streaming to have a real time result, so the user won't feel the app is slow.
 -->

---
level: 3
monacoRunAdditionalDeps:
- ollama

---
# Calling Ollama via SDK
https://github.com/ollama/ollama-js
```js {monaco-run} {autorun:false}
import ollama from 'ollama/browser'

const response = await ollama.chat({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)
```
---
level: 3
monacoRunAdditionalDeps:
- ollama

---
# Calling Ollama via SDK Streaming
https://github.com/ollama/ollama-js
```js {monaco-run} {autorun:false}
import ollama from 'ollama/browser'

const response = await ollama.chat({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  stream: true,
})
for await (const part of response) {
  console.log(part.message.content)
}
```

---
layout: center
class: text-center
---
# AI SDK

https://sdk.vercel.ai


<!-- Vercel SDK is a higher abstraction over ai. It enables to do more things without coupleing to the provider. -->
---
level: 2
layout: iframe
url: https://sdk.vercel.ai/docs/introduction
---

---
level: 2
---

# Getting started with Google Gemini AI

```bash
pnpm add @ai-sdk/google
```

Create `.env.local` file with your [Google API key](https://aistudio.google.com/app/apikey)

```bash
GOOGLE_GENERATIVE_AI_API_KEY="YOUR_KEY"
```

---
level: 2
monacoRunAdditionalDeps:
- ai
- @ai-sdk/google
- ./env
---

# AI SDK example

```ts {monaco-run} {autorun:false}
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { env } from "./env";

// Or just import { google } from "@ai-sdk/google";
const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const result = await generateText({
  model: google("models/gemini-1.5-flash-latest"),
  prompt: "Tell me a joke.",
});

console.log(result.text);
```

---
level: 2
monacoRunAdditionalDeps:
- ai
- @ai-sdk/google
- ./env
---

# AI SDK Image example

```ts {monaco-run} {autorun:false}
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { env } from "./env";

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const result = await generateText({
  model: google("models/gemini-1.5-flash-latest"),
  messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'Describe the image in detail.' },
        { type: 'image',  image: 'https://www.nirtamir.com/_astro/portrait.9b-_4A6X_bepz7.webp' },
      ]
    }],
});

console.log(result.text);

```

<div v-click class="absolute top-36 right-14 size-64">
 <img src="https://www.nirtamir.com/_astro/portrait.9b-_4A6X_bepz7.webp" alt="portrait" />
</div>

---
monacoRunAdditionalDeps:
- ai
- zod
- ./google-model
---

<style>

[override="true"] .slidev-monaco-container-inner {
  max-height: 200px !important;
}

</style>

# AI SDK Object example

```ts {monaco-run} {autorun:false, override: true}
import { generateObject } from "ai";
import { google } from "./google-model";
import { z } from 'zod';

const { object } = await generateObject({
  model: google("models/gemini-1.5-flash-latest"),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.string(),
        }),
      ),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

console.log(object);

```



---
monacoRunAdditionalDeps:
- ai
- zod
- ./google-model
---


<style>
  [override="280"] .slidev-monaco-container-inner {
    max-height: 280px !important;
  }

</style>

# AI SDK Tools example


```ts {monaco-run} {autorun:false, override: 280}
import { z } from 'zod';
import { google } from "./google-model";
import { generateText, tool } from 'ai';

const result = await generateText({
  model: google("models/gemini-1.5-flash-latest"),
    tools: {
    weather: tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: Math.floor(Math.random() * 30) + 7,
      }),
    }),
  },
  prompt: 'What is the weather in Tel Aviv?',
});

console.log(result.toolResults);

```
  <!-- toolChoice: 'required', // force the model to call a tool 
  
    temperature: 0, // don't try to be creative here
  -->



---
monacoRunAdditionalDeps:
- ai
- zod
- ./google-model
---


<style>
  [override="300"] .slidev-monaco-container-inner {
    max-height: 300px !important;
  }

</style>

# AI SDK Tools example with roundtrips 


```ts {monaco-run} {autorun:false, horizontal2: true, override: 300}
import { z } from 'zod';
import { google } from "./google-model";
import { generateText, tool } from 'ai';

const result = await generateText({
  model: google("models/gemini-1.5-flash-latest"),
    tools: {
    weather: tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: Math.floor(Math.random() * 30) + 7,
      }),
    }),
  },
  maxToolRoundtrips: 5, // allow up to 5 tool roundtrips
  prompt: 'What is the weather in San Francisco and Tel Aviv?',
});

console.log(result.text);
console.log(result.responseMessages);

```

---
layout: center
---

# Think about agents, tasks, real-time data, connect to external APIs...

<!-- 

[agentic](https://github.com/transitive-bullshit/agentic) - A collection of 20+ tools. Most tools connect to access external APIs such as Exa or E2B.
[browserbase](https://github.com/browserbase/js-sdk?tab=readme-ov-file#vercel-ai-sdk-integration) - Browser tool that runs a headless browser
 -->

---

# AI SDK UI
---

# AI SDK RSC

---
layout: two-cols-header
---

# Chrome 127 Experimental Built In AI Provider

::left::
<Tweet id="1799334729365487869" scale="0.65" />

::right::
<Tweet id="1804141104696016932" scale="0.65" />

---

### WebGPU enables to run more AI models in the browser

<Tweet id="1788177160227660079" scale="0.65" />

---
layout: iframe-right
url: https://chrome-ai-play.vercel.app/
monacoRunAdditionalDeps:
- ai
- chrome-ai
---

## Chrome 127 Experimental Built In AI Provider
[chrome-ai](https://github.com/jeasonstudio/chrome-ai)

```ts {monaco-run} {autorun:false}
import { chromeai } from "chrome-ai";
import { generateText } from "ai";

const result = await generateText({
  model: chromeai(),
  prompt: "Tell me a joke.",
});

console.log(result.text);
```


---
hide: true
---

# References (Ollama-js)

<Tweet id="1750000760450851030" scale="0.65" />

---

# References

<Tweet id="1727731541781152035" scale="0.65" />


---
layout: end
---

# Thank you!

- <mdi-web /> [nirtamir.com](https://nirtamir.com)
- <mdi-github /> [@nirtamir2](https://github.com/nirtamir2)
- <mdi-twitter /> [@NirTamir](https://twitter.com/NirTamir)
- <mdi-linkedin /> [@nirtamir2](https://linkedin.com/in/nirtamir2)
- <mdi-presentation /> [Slides](https://github.com/nirtamir2)
- <mdi-blog /> [Blog post](https://nirtamir.com)

---

# Further Reading
- Security
- Rate limits
- Prompt engineering
- Langchain
- RAG
- Agents

---
transition: slide-up
---

# Glossary

|       |                                              |
| ----- | -------------------------------------------- |
| AI    | Artificial intelligence                      |
| LLM   | Large language model (ChatGPT)               |
| RAG   | Retrieval-Augmented generation (Adding data) |
| genUI | UI generated by AI                           |

<!-- AI - Rather than explicitly programming a computer to perform a task, AI systems are trained on a large amount of data, allowing them to learn patterns and make predictions or decisions based on that
 -->

<!-- LLM A large language model (LLM) is a type of artificial intelligence (AI) program that can recognize and generate text, among other tasks (ChatGPT)
 -->

 <!-- A generative UI (genUI) is a user interface that is dynamically generated in real time by artificial intelligence to provide an experience customized to fit the user's needs and context
  -->

<!--
Retrieval-Augmented Generation (RAG) is the process of optimizing the output of a large language model, so it references an authoritative knowledge base outside of its training data sources before generating a response.
-->
