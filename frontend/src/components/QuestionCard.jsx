import React from 'react';

export default function QuestionCard({ question, selected, onSelect, index }) {
  return (
    <article className="card" aria-labelledby={`q-${question.id}`} style={{marginBottom:16}}>
      <div>
        <p id={`q-${question.id}`} className="font-semibold">{index + 1}. {question.question || question.text}</p>
      </div>
      <div style={{marginTop:12, display:'grid', gap:8}}>
        {(question.options || []).map((opt, idx) => {
          const checked = selected === idx;
          return (
            <label
              key={idx}
              className={`option ${checked ? 'selected' : ''}`}
              style={{display:'flex', alignItems:'center', gap:12, cursor:'pointer', padding:10, borderRadius:8, border:'1px solid rgba(0,0,0,0.04)'}}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={checked}
                onChange={() => onSelect(idx)}
                aria-checked={checked}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
}
