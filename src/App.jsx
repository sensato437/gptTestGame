import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlayerForm from './components/PlayerForm'
import GameScreen from './components/GameScreen'
import generateScenarioPrompt from './utils/generateScenarioPrompt'
import callGpt from './utils/callGpt'
import callGptWithPrompt from './utils/callGptWithPrompt'

function App() {
  const [player, setPlayer] = useState(null);
  const [scenario, setScenario] = useState("");

  const handlePlayerSubmit = async (playerData) => {
    setPlayer(playerData);
    const prompt = generateScenarioPrompt(playerData);
    const gptResponse = await callGptWithPrompt(prompt, 0.9);
    console.log("GPT 응답:", gptResponse);
    setScenario(gptResponse);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {player && scenario ? (
        <GameScreen player={player} rawScenario={scenario} />
      ) : (
        <PlayerForm onSubmit={handlePlayerSubmit} />
      )}
    </div>
  );
}

export default App;