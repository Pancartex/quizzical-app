import React, { useEffect, useState } from "react";
import "../style/quiz.css";
import AnswerLi from "./AnswerLi";
import { nanoid } from "nanoid";

export default function Question({ question, correctAnswer, allAnswers }) {
  function shuffleArr(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  shuffleArr(allAnswers);

  const answerOptions = allAnswers.map((answer) => {
    return {
      id: nanoid(),
      name: answer,
      correct: answer === correctAnswer ? true : false,
      isSelected: false,
    };
  });

  const answerLi = answerOptions.map((ans) => {
    return (
      <AnswerLi
        key={ans.id}
        id={ans.id}
        name={ans.name}
        isCorrect={ans.correct}
        isSelected={ans.isSelected}
      />
    );
  });

  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: `${question}` }}></p>
      <ul className="answers-list">{answerLi}</ul>
    </div>
  );
}

// dangerouslySetInnerHTML={{ __html: `${question}` }}
