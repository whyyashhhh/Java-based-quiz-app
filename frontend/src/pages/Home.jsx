import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function Home() {
  const navigate = useNavigate();
  const categories = ["science", "tech", "movies"];

  return (
    <div>
      <Header />
      <main className="main centered">
        <section className="hero">
          <div className="hero-inner">
            <h1>Sharpen your mind with IntelliQuiz</h1>
            <p className="lead">Choose a category and test your knowledge with short, sharp quizzes.</p>
            <div className="mt-6 shorten-form" role="list">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => navigate(`/quiz/${cat}`)}
                  className="btn-primary"
                  style={{marginRight:12}}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="card" style={{padding:20}}>
              <h3 className="mb-4">Quick stats</h3>
              <p className="muted">Practice anywhere — short quizzes designed for quick learning sessions.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
