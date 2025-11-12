import React from 'react';

export default function QuestionCard({question, selected, onSelect}){
  return (
    <div style={{border:'1px solid #ddd', padding:16, marginBottom:12}}>
      <h3>{question.text}</h3>
      <div>
        {question.options.map((opt, idx) => (
          <div key={idx} style={{marginBottom:8}}>
            <label>
              <input type="radio" name={`q-${question.id}`} checked={selected===idx} onChange={()=>onSelect(idx)} /> {opt}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
