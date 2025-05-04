function generateScenarioPrompt(player) {
  const suspectCount = Math.floor(Math.random() * 4) + 2;

  return `당신은 창의적인 추리 게임 마스터입니다.
무작위로 살인 사건을 만들어 다음과 같은 형식의 **정확한 JSON 객체**를 출력하세요. 

⚠️ 주의사항:
- 마크다운, 설명, 해설 없이 **JSON 객체만** 출력하세요.
- 들여쓰기나 주석도 없이 **순수 JSON만** 출력하세요.
- "culprit" 항목은 npc 목록 중 **이름과 정확히 일치해야** 합니다.

다음 필드를 포함하세요:
- 사건 개요(caseSummary)
- 장소(location)
- 피해자(victim: name, age, description)
- 용의자 ${suspectCount}명 (npcs: name, age, personality, role, alibi, suspiciousPoint)
- 범인(culprit)

예시:
{
  "caseSummary": "한적한 마을에서 발생한 의문의 살인 사건...",
  "location": "서울 외곽의 작은 주택",
  "victim": {
    "name": "김지현",
    "age": 42,
    "description": "마을에서 꽃집을 운영하던 친절한 여성"
  },
  "npcs": [
    {
      "name": "박민수",
      "age": 35,
      "personality": "신중하고 말이 적음",
      "role": "피해자의 전 동료",
      "alibi": "사건 당시 집에서 혼자 책을 읽고 있었음",
      "suspiciousPoint": "사건 당일 피해자와 말다툼 목격"
    }
  ],
  "culprit": "박민수"
}`;
}

export default generateScenarioPrompt;
