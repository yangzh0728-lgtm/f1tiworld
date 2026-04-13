import Link from "next/link";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return (
    <div className="f1-shell">
      <header className="f1-quiz-cover">
        <nav className="f1-topbar" aria-label="F1 quiz navigation">
          <Link className="f1-brand" href="/">
            F1 Driver Match
          </Link>
          <Link className="f1-season" href="/">
            返回封面
          </Link>
        </nav>
        <div className="f1-quiz-cover-copy">
          <p className="f1-kicker">Race Control</p>
          <h1>选择最像你的反应</h1>
          <p>40 道情境题，全部答完后查看你的车手人格类型。</p>
        </div>
      </header>

      <main>
        <QuizClient />
      </main>
    </div>
  );
}
