import React, { useState, useEffect } from "react";
import "./style/form.css";
import "./style/quiz.css";
import "./style/index.css";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import arrayShuffle from "array-shuffle";
import Form from "../src/components/Form";
import Question from "../src/components/Question";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
    amount: 5,
  });
  const [questionData, setQuestionData] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [endgame, setEndGame] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((quizData) =>
        setQuestionData(
          quizData.results.map((question) => {
            let shuffledAnswers = arrayShuffle([
              question.correct_answer,
              ...question.incorrect_answers,
            ]);
            return {
              questionId: nanoid(),
              question: decode(question.question),
              shuffled_answers: shuffledAnswers.map((answer) => ({
                id: nanoid(),
                answerName: decode(answer),
                isCorrect: answer === question.correct_answer ? true : false,
                isSelected: false,
              })),
            };
          })
        )
      );
  }, [formData]);

  useEffect(() => {
    checkAllSelected();
  }, [questionData]);

  //  HANDLE CHANGES IN STARTER FORM
  //  HANDLE CHANGES IN STARTER FORM

  // handle changes in form
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFromData) => {
      return {
        ...prevFromData,
        [name]: value,
      };
    });
  }

  // submit form function
  function handleSubmitRules(e) {
    e.preventDefault();
    if (formData.amount < 5 || formData.amount > 25) {
      return alert("You must select between 5 to 25 questions");
    }
    setIsStarted(true);
  }

  // passing this function to the question component to select the answer for each questions
  function toggleSelectedAnswer(id, questionId) {
    setQuestionData((prevQuestions) => {
      prevQuestions
        .find((question) => question.questionId === questionId)
        .shuffled_answers.map((answer) =>
          answer.id === id
            ? (answer.isSelected = true)
            : (answer.isSelected = false)
        );
      return [...prevQuestions];
    });
  }

  // loop through questions & their answers to check if they are all selected
  function checkAllSelected() {
    let selected = 0;
    for (let i = 0; i < questionData.length; i++) {
      for (let j = 0; j < questionData[0].shuffled_answers.length; j++) {
        if (questionData[i].shuffled_answers[j].isSelected) {
          selected++;
        }
      }
    }

    if (selected === questionData.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }

  // maybe merge both checkAllSelected & countCorrectAnswers
  // maybe merge both checkAllSelected & countCorrectAnswers

  // loop through questions & their answers to count the correct answers
  function countCorrectAnswers() {
    let correct = 0;
    for (let i = 0; i < questionData.length; i++) {
      for (let j = 0; j < questionData[0].shuffled_answers.length; j++) {
        if (
          questionData[i].shuffled_answers[j].isSelected &&
          questionData[i].shuffled_answers[j].isCorrect
        ) {
          correct++;
        }
      }
    }
    setCorrectAnswers(correct);
  }

  // function to submit your answers
  function submitAnswers() {
    if (allSelected && !endgame) {
      countCorrectAnswers();
      setEndGame(true);
    } else {
      animate();
    }
  }

  // play again button after submitting answers
  function playAgain() {
    setIsStarted(false);
    setQuestionData([]);
    setAllSelected(false);
    setEndGame(false);
    setFormData({ category: "", difficulty: "", amount: 5 });
    setCorrectAnswers(0);
  }

  // creating the question component
  const questionEl = questionData.map((question) => {
    return (
      <Question
        key={question.questionId}
        question={question.question}
        shuffled_answers={question.shuffled_answers}
        questionId={question.questionId}
        toggleSelectedAnswer={toggleSelectedAnswer}
        endgame={endgame}
      />
    );
  });

  const animate = () => {
    // Button begins to shake
    setShake(true);

    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="App">
      {!isStarted && (
        <div className="intro-page">
          <h1 className="intro-title">Quizzical</h1>
          <Form
            handleChange={handleChange}
            handleSubmitRules={handleSubmitRules}
            formData={formData}
            categories={categories}
          />
        </div>
      )}
      {isStarted && (
        <div className="quiz-container">
          {questionEl}
          <div className="quiz-footer">
            {!endgame && (
              <button
                onClick={submitAnswers}
                className={`quiz-button ${shake ? `shake` : null}`}
              >
                Check Answers
              </button>
            )}
            {endgame && (
              <div className="endgame-button-wrap">
                <p className="score">
                  You have {correctAnswers}/{questionData.length} correct
                  answers
                </p>
                <button
                  onClick={playAgain}
                  className="quiz-button play-again-btn"
                >
                  Play again?
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
