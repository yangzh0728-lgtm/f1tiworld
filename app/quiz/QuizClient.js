"use client";

import { useMemo, useRef, useState } from "react";
import { f1Questions } from "./quizData";
import { calculateF1Result } from "./quizLogic";

const emptyAnswers = Object.fromEntries(f1Questions.map((question) => [question.id, ""]));

export default function QuizClient() {
  const quizRef = useRef(null);
  const resultRef = useRef(null);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [result, setResult] = useState(null);

  const selectedAnswerIds = useMemo(
    () => f1Questions.map((question) => answers[question.id] || null),
    [answers]
  );
  const answeredCount = selectedAnswerIds.filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / f1Questions.length) * 100);
  const isComplete = answeredCount === f1Questions.length;

  function updateAnswer(questionId, optionId) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionId
    }));
  }

  function submitQuiz() {
    if (!isComplete) {
      return;
    }

    const nextResult = calculateF1Result(selectedAnswerIds);
    setResult(nextResult);
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function resetQuiz() {
    setAnswers(emptyAnswers);
    setResult(null);
    window.requestAnimationFrame(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <section ref={quizRef} id="f1-quiz" className="f1-quiz" aria-labelledby="quiz-title">
        <div className="f1-quiz-head">
          <div>
            <p className="f1-kicker">Question Board</p>
            <h2 id="quiz-title">你的比赛选择</h2>
          </div>
          <p id="quiz-progress" className="f1-progress-text">
            {answeredCount} / {f1Questions.length}
          </p>
        </div>

        <div className="f1-progress-bar" aria-hidden="true">
          <span id="quiz-progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>

        <form id="f1-quiz-form" className="f1-question-list">
          {f1Questions.map((question, questionIndex) => (
            <fieldset className="f1-question" key={question.id}>
              <legend>
                <span>{String(questionIndex + 1).padStart(2, "0")}</span>
                {question.title}
              </legend>
              <div className="f1-options">
                {question.options.map((option) => (
                  <label className="f1-option" key={option.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => updateAnswer(question.id, option.id)}
                    />
                    <span>
                      {option.choice ? <b>{option.choice}</b> : null}
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </form>

        <div className="f1-actions">
          <button id="submit-quiz" className="f1-submit" type="button" disabled={!isComplete} onClick={submitQuiz}>
            查看我的车手
          </button>
          <p className="f1-submit-hint">全选完才会放行。围场已经够乱了，起码把题做完整。</p>
          <button id="reset-quiz" className="f1-reset" type="button" onClick={resetQuiz}>
            重新选择
          </button>
        </div>
      </section>

      {result ? <QuizResult result={result} resultRef={resultRef} /> : null}
    </>
  );
}

function QuizResult({ result, resultRef }) {
  const accent = result.driver.accentColor || result.driver.color;
  const primary = result.driver.color;
  const secondary = result.driver.secondaryColor || result.driver.color;

  return (
    <section
      ref={resultRef}
      id="f1-result"
      className="f1-result"
      aria-live="polite"
      style={{
        "--driver-color": accent,
        "--driver-primary": primary,
        "--driver-secondary": secondary
      }}
    >
      <div className="f1-result-main">
        <figure className="f1-driver-card">
          <figcaption>
            <span className="f1-type-label">你的人格类型是：</span>
            <strong id="result-driver-name">{result.driver.nickname}</strong>
            <span id="result-driver-team">
              {result.driver.name} · {result.driver.team}
            </span>
            <div className="f1-result-stats">
              <span id="result-driver-number">比赛号码 #{result.driver.number}</span>
              <span id="result-match-percent">匹配度 {result.percent}%</span>
            </div>
          </figcaption>
          <img
            id="result-avatar"
            src={result.driver.image}
            alt={`${result.driver.name} 卡通图片`}
            onError={(event) => {
              event.currentTarget.removeAttribute("src");
              event.currentTarget.alt = `${result.driver.name} 图片没有加载成功`;
            }}
          />
        </figure>
        <p className="f1-kicker">人格解读</p>
        <h2 id="result-headline">
          {result.driver.nickname}（{result.driver.name}）
        </h2>
        <p id="result-summary">{result.driver.summary}</p>
        <p id="result-detail">{result.driver.detail}</p>
        <div id="result-traits" className="f1-traits">
          {result.driver.traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </div>

      <aside className="f1-podium" aria-label="Closest driver matches">
        <h3>最接近你的前三名</h3>
        <div id="result-podium">
          {result.matches.map((match, index) => (
            <article className="f1-podium-item" key={match.driver.id}>
              <span className="f1-rank">P{index + 1}</span>
              <div>
                <strong>{match.driver.nickname}</strong>
                <small>
                  #{match.driver.number} · {match.driver.name} · {match.driver.team}
                </small>
                <small>
                  匹配度 {match.percent}% · {match.score} pts
                </small>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
