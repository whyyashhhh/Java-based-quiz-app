import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div className="p-8">
      <h2 className="text-2xl mb-4">Category: {category}</h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="font-semibold">{i + 1}. {q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} className="block mt-1">
              <input
                type="radio"
                name={q.question}
                value={opt}
                onChange={() => setAnswers({ ...answers, [q.question]: opt })}
              /> {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz} className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg">
        Submit Quiz
      </button>
    </div>
  );
}
