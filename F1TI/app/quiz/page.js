import Link from "next/link";
import Script from "next/script";
import QuizBootstrap from "./QuizBootstrap";

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
        <section id="f1-quiz" className="f1-quiz" aria-labelledby="quiz-title">
          <div className="f1-quiz-head">
            <div>
              <p className="f1-kicker">Question Board</p>
              <h2 id="quiz-title">你的比赛选择</h2>
            </div>
            <p id="quiz-progress" className="f1-progress-text">
              0 / 40
            </p>
          </div>

          <div className="f1-progress-bar" aria-hidden="true">
            <span id="quiz-progress-bar" />
          </div>

          <form id="f1-quiz-form" className="f1-question-list" />

          <div className="f1-actions">
            <button id="submit-quiz" className="f1-submit" type="button" disabled>
              查看我的车手
            </button>
            <p className="f1-submit-hint">全选完才会放行。围场已经够乱了，起码把题做完整。</p>
            <button id="reset-quiz" className="f1-reset" type="button">
              重新选择
            </button>
          </div>
        </section>

        <section id="f1-result" className="f1-result" hidden aria-live="polite">
          <div className="f1-result-main">
            <figure className="f1-driver-card">
              <figcaption>
                <span className="f1-type-label">你的人格类型是：</span>
                <strong id="result-driver-name" />
                <span id="result-driver-team" />
                <div className="f1-result-stats">
                  <span id="result-driver-number" />
                  <span id="result-match-percent" />
                </div>
              </figcaption>
              <img id="result-avatar" alt="" />
            </figure>
            <p className="f1-kicker">人格解读</p>
            <h2 id="result-headline" />
            <p id="result-summary" />
            <p id="result-detail" />
            <div id="result-traits" className="f1-traits" />
          </div>

          <aside className="f1-podium" aria-label="Closest driver matches">
            <h3>最接近你的前三名</h3>
            <div id="result-podium" />
          </aside>
        </section>
      </main>

      <Script src="/f1-quiz.js?v=20260412-17" strategy="afterInteractive" />
      <QuizBootstrap />
    </div>
  );
}
