// utils/callGpt.js
async function callGpt(messages, temperature = 0.7) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("❌ API 키가 비어있습니다.");
    throw new Error("API 키 누락");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ GPT API 응답 실패:", data);
    throw new Error(data.error?.message || "GPT 호출 실패");
  }

  return data.choices[0].message.content;
}

export default callGpt;
