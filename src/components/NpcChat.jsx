import { useState } from "react";
import callGpt from "../utils/callGpt";

function NpcChat({ npc }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const systemPrompt = `너는 ${npc.name}라는 인물이고, ${npc.role}이다. 다음은 너의 인격과 정보다:
- 성격: ${npc.personality}
- 알리바이: ${npc.alibi}
- 의심 포인트: ${npc.suspiciousPoint}
플레이어가 질문을 하면 ${npc.name}답게 연기하며 대답하라.`;

    const response = await callGpt([
      { role: "system", content: systemPrompt },
      ...newMessages,
    ]);

    setMessages([...newMessages, { role: "assistant", content: response }]);
    setLoading(false);
  };

  return (
    <div className="border p-4 rounded mt-6 bg-gray-50">
      <h3 className="text-lg font-bold mb-2">💬 {npc.name}와 대화</h3>
      <div className="h-40 overflow-y-auto bg-white p-2 border rounded text-sm mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.role === "user" ? "text-right" : ""}`}>
            <span className={msg.role === "user" ? "text-blue-600" : "text-green-600"}>
              {msg.role === "user" ? "당신" : npc.name}:
            </span>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="질문 입력..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={handleSend}
          disabled={loading}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default NpcChat;
