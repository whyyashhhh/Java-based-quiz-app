import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const categories = ["science", "tech", "movies"];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🧠 IntelliQuiz</h1>
      <p className="text-gray-600 mb-4">Select a category to start your quiz:</p>
      <div className="flex gap-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => navigate(`/quiz/${cat}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
