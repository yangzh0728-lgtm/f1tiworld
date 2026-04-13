# Quiz Public Script Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `public/f1-quiz.js` into proper Next.js source files while preserving quiz behavior.

**Architecture:** Split pure quiz content and scoring from the interactive UI. Keep images in `public/`, export data/logic from `app/quiz/quizData.js` and `app/quiz/quizLogic.js`, and render the quiz with a React client component.

**Tech Stack:** Next.js App Router, React client component, plain JavaScript modules.

---

### Task 1: Extract Quiz Data and Logic

**Files:**
- Create: `app/quiz/quizData.js`
- Create: `app/quiz/quizLogic.js`

- [x] Move driver data, image mapping, question data, and helper option constructors into `quizData.js`.
- [x] Export `f1Drivers` and `f1Questions`.
- [x] Move `calculateF1Result(answerIds)` into `quizLogic.js`.
- [x] Import `f1Drivers` and `f1Questions` from `quizData.js`.

### Task 2: Build React Quiz Component

**Files:**
- Replace: `app/quiz/QuizBootstrap.js`

- [x] Convert the bootstrap file into a `"use client"` React component.
- [x] Use `useState` and `useMemo` for answers, progress, and result calculation.
- [x] Render question radio groups directly in JSX.
- [x] Render result card, podium, progress, submit, and reset from React state.

### Task 3: Update Page Integration

**Files:**
- Modify: `app/quiz/page.js`

- [x] Remove `next/script`.
- [x] Replace DOM placeholder sections with the React quiz component.
- [x] Preserve the existing cover/header copy and CSS class names.

### Task 4: Remove Obsolete Public Script

**Files:**
- Delete: `public/f1-quiz.js`

- [x] Confirm no references to `F1Quiz`, `F1QuizAppInit`, or `/f1-quiz.js` remain.

### Task 5: Verify and Sync

**Files:**
- Check: `package.json`
- Check: Git state

- [ ] Run `npm install` if dependencies are missing.
- [ ] Run `npm run build`.
- [ ] Commit the migration.
- [ ] Push `main` to GitHub.
