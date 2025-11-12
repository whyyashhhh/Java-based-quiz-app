import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Your Score</h1>
      <p className="text-xl mt-4">{state?.score} / {state?.total}</p>
      <button onClick={() => navigate("/")} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Play Again
      </button>
    </div>
  );
}
