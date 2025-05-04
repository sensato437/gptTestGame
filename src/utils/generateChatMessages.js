function generateChatMessages(npc, playerQuestion) {
    return [
      {
        role: "system",
        content: `너는 추리 게임에 등장하는 인물 ${npc.name}야. 성격은 ${npc.personality}이고, 피해자와의 관계는 ${npc.role}이야. 알리바이는 ${npc.alibi}.`,
      },
      {
        role: "user",
        content: playerQuestion,
      },
    ];
  }
  export default generateChatMessages