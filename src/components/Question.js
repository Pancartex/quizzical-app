import React from "react";

export default function Question({
  questionId,
  question,
  shuffled_answers,
  toggleSelectedAnswer,
  endgame,
}) {
  const answerList = shuffled_answers.map((answer) => {
    let styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "transparent",
      border: answer.isSelected ? "none" : "1px solid rgba(77, 91, 158, 0.8)",
      fontWeight: answer.isSelected ? "500" : "400",
    };
    if (endgame) {
      styles = {
        backgroundColor: answer.isCorrect
          ? "#94D7A2"
          : answer.isSelected && !answer.isCorrect
          ? "#F8BCBC"
          : "transparent",
        opacity:
          answer.isCorrect && answer.isSelected
            ? "1"
            : answer.isCorrect && !answer.isSelected
            ? "0.8"
            : !answer.isCorrect && answer.isSelected
            ? "0.8"
            : "0.6",
        cursor: "default",
        border: answer.isCorrect
          ? "none"
          : answer.isSelected && !answer.isCorrect
          ? "none"
          : "1px solid var(--darkblue)",
        color: answer.isSelected && !answer.isCorrect ? "#A45252" : "#293264",
        fontWeight: answer.isCorrect ? "500" : "400",
      };
    }

    return (
      <li
        style={styles}
        key={answer.id}
        id={answer.id}
        onClick={() =>
          endgame ? null : toggleSelectedAnswer(answer.id, questionId)
        }
      >
        {answer.answerName}
      </li>
    );
  });

  return (
    <div id={questionId} className="question-container">
      <h3 className="question-title">{question}</h3>
      <ul className="answers-list">{answerList}</ul>
    </div>
  );
}
