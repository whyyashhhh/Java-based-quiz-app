import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`/api/quiz/${category}`)
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error(err));
  }, [category]);

  const onSelect = (questionId, optionIndex) => {
    setAnswers((s) => ({ ...s, [questionId]: optionIndex }));
  };

  const submitQuiz = async () => {
    const payload = Object.entries(answers).map(([question, answer]) => ({ question, answer }));
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    navigate("/result", { state: result });
  };

  return (
    <div>
      <Header />
      <main className="main centered">
        <h2 className="mb-4">Category: {category}</h2>

        {questions.length === 0 && <p className="muted">Loading questions...</p>}

        {questions.map((q, i) => (
          <QuestionCard
            key={q.id || i}
            index={i}
            question={q}
            selected={answers[q.question] ?? answers[q.id]}
            onSelect={(optIdx) => onSelect(q.question ?? q.id, optIdx)}
          />
        ))}

        <div style={{marginTop:16}}>
          <button onClick={submitQuiz} className="btn-primary">
            Submit Quiz
          </button>
        </div>
      </main>
    </div>
  );
}
