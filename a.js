const response = await fetch("http://localhost:11434/v1/chat/completions", {
  method: "POST",
  body: JSON.stringify({
    model: "llama3",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "Hello!",
      },
    ],
  }),
});
const data = await response.json();
console.log(data);
