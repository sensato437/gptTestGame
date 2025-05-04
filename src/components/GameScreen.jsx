import { useState } from "react";
import askNpc from "../utils/askNpc";

function GameScreen({ player, rawScenario }) {
  const parsedScenario =
    typeof rawScenario === "string" ? JSON.parse(rawScenario) : rawScenario;
  const { caseSummary, location, victim, npcs, culprit } = parsedScenario;

  const [clues, setClues] = useState([]);
  const [log, setLog] = useState([]);
  const [inspectedNpcs, setInspectedNpcs] = useState(new Set());

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState("");

  const [npcQuestions, setNpcQuestions] = useState({});
  const [npcAnswers, setNpcAnswers] = useState({});

  const handleNpcClick = (npc) => {
    if (inspectedNpcs.has(npc.name)) return;

    const clue = `🗣️ ${npc.name}의 진술: ${npc.alibi}`;
    const suspicion = `❗ 의심 포인트: ${npc.suspiciousPoint}`;

    setClues((prev) => [...prev, clue, suspicion]);
    setLog((prev) => [...prev, `👤 ${npc.name} 조사 완료`]);
    setInspectedNpcs((prev) => new Set(prev).add(npc.name));
  };

  const handleAskQuestion = async (npc) => {
    const question = npcQuestions[npc.name]?.trim();
    if (!question) return;

    try {
      const answer = await askNpc(player.name, npc, question, caseSummary);
      setNpcAnswers((prev) => ({ ...prev, [npc.name]: answer }));
      setLog((prev) => [
        ...prev,
        `❓ ${npc.name}에게 질문: ${question}`,
        `💬 답변: ${answer}`,
      ]);
      setNpcQuestions((prev) => ({ ...prev, [npc.name]: "" }));
    } catch (err) {
      console.error("질문 실패:", err);
    }
  };

  const handleSubmitGuess = () => {
    setIsSubmitted(true);
    const result =
      selectedSuspect === culprit
        ? `🎉 정답입니다! 범인은 ${culprit}입니다.`
        : `❌ 틀렸습니다. 정답은 ${culprit}입니다.`;
    setLog((prev) => [...prev, `🕵️ 최종 추리: ${selectedSuspect}`, result]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔍 추리 게임 시작</h1>
      <p className="text-gray-700">{caseSummary}</p>
      <p className="text-sm text-gray-500">장소: {location}</p>

      <div className="bg-yellow-100 p-4 rounded">
        <h2 className="text-lg font-semibold">🧍 피해자</h2>
        <p>
          {victim.name} ({victim.age}세): {victim.description}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">👥 용의자 목록</h2>
        <div className="grid gap-4 mt-4">
          {npcs.map((npc) => {
            const isInspected = inspectedNpcs.has(npc.name);
            return (
              <div
                key={npc.name}
                className={`border rounded-xl p-4 space-y-2 ${
                  isInspected ? "bg-green-100" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-bold">
                  {npc.name} ({npc.age}세)
                </h3>
                <p>관계: {npc.role}</p>
                <p>성격: {npc.personality}</p>
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleNpcClick(npc)}
                >
                  {isInspected ? "✅ 조사 완료" : "👉 클릭해서 조사하기"}
                </button>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="이 NPC에게 질문하기"
                    className="border p-1 rounded w-full"
                    value={npcQuestions[npc.name] || ""}
                    onChange={(e) =>
                      setNpcQuestions((prev) => ({
                        ...prev,
                        [npc.name]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="mt-1 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleAskQuestion(npc)}
                  >
                    질문하기
                  </button>
                  {npcAnswers[npc.name] && (
                    <p className="mt-1 bg-gray-100 p-2 rounded text-sm">
                      💬 {npcAnswers[npc.name]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">🧠 최종 추리</h2>
        <select
          value={selectedSuspect}
          onChange={(e) => setSelectedSuspect(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">-- 용의자 선택 --</option>
          {npcs.map((npc) => (
            <option key={npc.name} value={npc.name}>
              {npc.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmitGuess}
          disabled={!selectedSuspect || isSubmitted}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          추리 제출
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">📜 단서 및 로그</h2>
        <ul className="bg-gray-100 p-4 rounded space-y-2 text-sm">
          {clues.map((clue, idx) => (
            <li key={idx}>{clue}</li>
          ))}
          {log.map((entry, idx) => (
            <li key={`log-${idx}`}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameScreen;
