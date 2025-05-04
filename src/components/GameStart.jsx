import { useState } from "react";
import generateScenarioPrompt from "../utils/generateScenarioPrompt";
import PlayerForm from "./PlayerForm";

function GameStart({onStart}){
    const [player,setPlayer] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('');

    const handlePlayerSubmit = async (playerData) => {
        setPlayer(playerData);
        setLoading(true);
        setError("");
    

        try{
            const prompt = generateScenarioPrompt(playerData);
            const gptResponse = await callGpt(prompt);

            onStart({
                player: playerData,
                rawScenario: gptResponse
            });
        } catch(err){
            console.log(err);
            setError("시나리오를 가져오는데 실패했습니다.")
        }finally{
            setLoading(false);
        }
    }  
    
    return(
        <div>
            {player== null && <PlayerForm onSubmit={handlePlayerSubmit}/> }

            {loading && (
                <div className="text-center mt-10 text-lg">시나리오를 생성 중입니다...</div>
            )}

            {error &&(
                 <div className="text-center text-red-500 mt-4">{error}</div>
            )}
        </div>
    )

}