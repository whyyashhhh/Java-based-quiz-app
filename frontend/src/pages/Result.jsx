import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="main centered">
        <div className="card" style={{maxWidth:560, margin:'48px auto', textAlign:'center'}}>
          <h2 className="mb-4">Your Score</h2>
          <p className="text-xl" style={{marginBottom:20}}>{state?.score} / {state?.total}</p>
          <div style={{display:'flex',justifyContent:'center',gap:12}}>
            <button onClick={() => navigate("/")} className="btn-primary">Play Again</button>
            <button className="btn-ghost" onClick={() => navigator.share ? navigator.share({title:'My Quiz Score', text:`I scored ${state?.score}/${state?.total} on IntelliQuiz!`}) : null}>
              Share
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
