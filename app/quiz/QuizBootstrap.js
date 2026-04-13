"use client";

import { useEffect } from "react";

export default function QuizBootstrap() {
  useEffect(() => {
    window.F1QuizAppInit?.();
  }, []);

  return null;
}
