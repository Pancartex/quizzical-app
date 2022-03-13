import React, { useState, useEffect } from "react";
import "./style/index.css";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import arrayShuffle from "array-shuffle";
import Form from "../src/components/Form";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
    amount: 1,
  });
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  //  HANDLE CHANGES IN STARTER FORM
  //  HANDLE CHANGES IN STARTER FORM

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFromData) => {
      return {
        ...prevFromData,
        [name]: value,
      };
    });
  }

  function handleSubmitRules(e) {
    e.preventDefault();
    if (formData.amount < 1 || formData.amount > 25) {
      return alert("You must select between 1 to 25 questions");
    }
    setIsStarted(true);
  }

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((quizData) => setQuizData(quizData.results));
    console.log(quizData);
  }, [formData]);

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
      {isStarted && <div className="quiz-container"></div>}
    </div>
  );
}

export default App;
