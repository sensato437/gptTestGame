import { useState } from "react"

function PlayerForm({onSubmit}){
    const[name,setName] = useState('');
    const[age,setAge] = useState('');
    const[gender,setGender] = useState('')
    const[personality,setPersonality] = useState('')

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        onSubmit({name,age,gender,personality})
    }

    return(
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">플레이어 캐릭터 설정</h2>

      <div>
        <label className="block font-semibold">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">나이</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">성별</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">선택하세요</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">성격 (간단히)</label>
        <input
          type="text"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          placeholder="예: 침착하고 논리적임"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        게임 시작
      </button>
    </form>
  );
}

export default PlayerForm