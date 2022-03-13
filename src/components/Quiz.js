import React, { useState } from "react";
import "../style/quiz.css";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz({ quizData }) {
  const [selection, setSelection] = useState([]);
  const [correctCount, setCorrectCount] = useState([0]);

  function SubmitAnswers(answer, correct_answer) {
    setSelection((prevSelection) => {
      prevSelection.map((selection) => {
        return selection.answer === correct_answer
          ? setCorrectCount((prevCount) => prevCount + 1)
          : "";
      });
    });
  }

  return (
    <div className="quiz-container">
      {quizData.map((Q) => {
        const answerArr = [Q.correct_answer, ...Q.incorrect_answers];
        return (
          <Question
            key={nanoid()}
            id={nanoid()}
            question={Q.question}
            correctAnswer={Q.correct_answer}
            incorrectAnswers={Q.incorrect_answers}
            allAnswers={answerArr}
            // toggleSelected={toggleSelected}
          />
        );
      })}
    </div>
  );
}
