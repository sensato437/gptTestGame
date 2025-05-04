import callGpt from "./callGpt";

async function askNpc(playerName, npc, question, caseSummary) {
  const prompt = `
당신은 추리 게임 속 등장인물 "${npc.name}"입니다.

사건 개요: ${caseSummary}
당신의 성격: ${npc.personality}
당신의 역할: ${npc.role}
당신의 알리바이: ${npc.alibi}
당신에게 의심 가는 점: ${npc.suspiciousPoint}

플레이어 ${playerName}이(가) 당신에게 이렇게 물었습니다:
"${question}"

당신의 입장에서, 자연스럽고 간단한 한국어로만 대답해 주세요.
배경 설명은 하지 말고, 대답만 출력하세요.
`;

  try {
    const response = await callGpt([
      { role: "system", content: "당신은 역할극을 잘하는 NPC입니다." },
      { role: "user", content: prompt }
    ]);
    return response.trim();
  } catch (err) {
    console.error("❌ NPC 질문 응답 실패:", err);
    return "죄송합니다, 대답할 수 없습니다.";
  }
}

export default askNpc;
