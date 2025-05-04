// utils/callGptWithPrompt.js
import callGpt from './callGpt';

async function callGptWithPrompt(prompt, temperature = 0.8) {
  return await callGpt([
    { role: "system", content: "당신은 창의적인 추리 시나리오 생성 마스터입니다." },
    { role: "user", content: prompt }
  ], temperature);
}

export default callGptWithPrompt;
