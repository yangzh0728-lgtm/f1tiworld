import { f1Drivers, f1Questions } from "./quizData";

export function calculateF1Result(answerIds) {
  if (!Array.isArray(answerIds) || answerIds.length !== f1Questions.length) {
    throw new Error("Answer count must match question count");
  }

  const scores = Object.fromEntries(f1Drivers.map((driver) => [driver.id, 0]));

  f1Questions.forEach((question, index) => {
    const selectedOption = question.options.find((item) => item.id === answerIds[index]);
    if (!selectedOption) {
      throw new Error(`Unknown answer for ${question.id}`);
    }

    Object.entries(selectedOption.weights).forEach(([driverId, weight]) => {
      scores[driverId] += weight;
    });
  });

  const maxPossible = f1Questions.reduce((total, question) => {
    const questionMax = Math.max(...question.options.map((item) => Math.max(...Object.values(item.weights))));
    return total + questionMax;
  }, 0);

  const sortedMatches = f1Drivers
    .map((driver) => ({ driver, score: scores[driver.id] }))
    .sort((a, b) => b.score - a.score || a.driver.name.localeCompare(b.driver.name));
  const topScore = sortedMatches[0].score;
  const matches = sortedMatches.slice(0, 3).map((match) => {
    const rawPercent = (match.score / maxPossible) * 100;
    return {
      ...match,
      percent: Math.max(40, Math.min(92, Math.round(rawPercent * 1.45 + 18)))
    };
  });

  return {
    driver: matches[0].driver,
    allDrivers: f1Drivers,
    score: topScore,
    percent: matches[0].percent,
    matches
  };
}
