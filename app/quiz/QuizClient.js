"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { f1Questions } from "./quizData";
import { calculateF1Result } from "./quizLogic";

const emptyAnswers = Object.fromEntries(f1Questions.map((question) => [question.id, ""]));

export default function QuizClient() {
  const quizRef = useRef(null);
  const resultRef = useRef(null);
  const [questionOrder, setQuestionOrder] = useState(f1Questions);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setQuestionOrder(shuffleQuestions(f1Questions));
  }, []);

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
          {questionOrder.map((question, questionIndex) => (
            <fieldset className="f1-question" key={question.id}>
              <legend>
                <span>{String(questionIndex + 1).padStart(2, "0")}</span>
                {question.title}
              </legend>
              <div className="f1-options">
                {question.options.map((option, optionIndex) => (
                  <label className="f1-option" key={option.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => updateAnswer(question.id, option.id)}
                    />
                    <span>
                      <b>{option.choice || String.fromCharCode(65 + optionIndex)}</b>
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

function shuffleQuestions(questions) {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[swapIndex]] = [shuffledQuestions[swapIndex], shuffledQuestions[index]];
  }

  return shuffledQuestions;
}

function QuizResult({ result, resultRef }) {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const selectedMatch = result.matches[selectedMatchIndex] || result.matches[0];
  const selectedDriver = selectedMatch.driver;
  const accent = selectedDriver.accentColor || selectedDriver.color;
  const primary = selectedDriver.color;
  const secondary = selectedDriver.secondaryColor || selectedDriver.color;
  const typeLabel = selectedMatchIndex === 0 ? "你的人格类型是：" : "另一个很像你的类型：";

  useEffect(() => {
    setSelectedMatchIndex(0);
  }, [result]);

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
            <span className="f1-type-label">{typeLabel}</span>
            <strong id="result-driver-name">{selectedDriver.nickname}</strong>
            <span id="result-driver-team">
              {selectedDriver.name} · {selectedDriver.team}
            </span>
            <div className="f1-result-stats">
              <span id="result-driver-number">比赛号码 #{selectedDriver.number}</span>
              <span id="result-match-percent">匹配度 {selectedMatch.percent}%</span>
            </div>
          </figcaption>
          <img
            id="result-avatar"
            src={selectedDriver.image}
            alt={`${selectedDriver.name} 卡通图片`}
            onError={(event) => {
              event.currentTarget.removeAttribute("src");
              event.currentTarget.alt = `${selectedDriver.name} 图片没有加载成功`;
            }}
          />
        </figure>
        <p className="f1-kicker">人格解读</p>
        <h2 id="result-headline">
          {selectedDriver.nickname}（{selectedDriver.name}）
        </h2>
        <p id="result-summary">{selectedDriver.summary}</p>
        <p id="result-detail">{selectedDriver.detail}</p>
        <div id="result-traits" className="f1-traits">
          {selectedDriver.traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </div>

      <aside className="f1-podium" aria-label="Closest driver matches">
        <h3>最接近你的前三名</h3>
        <div id="result-podium">
          {result.matches.map((match, index) => (
            <button
              className="f1-podium-item"
              type="button"
              key={match.driver.id}
              aria-pressed={selectedMatchIndex === index}
              onClick={() => setSelectedMatchIndex(index)}
            >
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
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
