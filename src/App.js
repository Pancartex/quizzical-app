import React, { useState, useEffect } from "react";
import "./style/index.css";
import Quiz from "./components/Quiz";

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
  }, [formData]);

  return (
    <div className="App">
      {!isStarted && (
        <div className="intro-page">
          <h1 className="intro-title">Quizzical</h1>

          <form onSubmit={handleSubmitRules} className="intro-form">
            <div className="intro-selections">
              <label htmlFor="category">Category: </label>
              <select
                name="category"
                id="category"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option key="Any Category" id="Any Category" value="">
                  Any Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    id={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="intro-selections">
              <label htmlFor="difficulty">Difficulty: </label>
              <select
                name="difficulty"
                id="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option key="Any Difficulty" id="Any Difficulty" value="">
                  Any Difficulty
                </option>
                <option key="easy" id="easy" value="easy">
                  Easy
                </option>
                <option key="medium" id="medium" value="medium">
                  Medium
                </option>
                <option key="hard" id="hard" value="hard">
                  Hard
                </option>
              </select>
            </div>
            <div className="intro-selections">
              <label htmlFor="amount">Numbers of Questions: </label>
              <input
                className="amount-input"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                max="25"
              ></input>
            </div>

            <button className="intro-btn" onClick={handleSubmitRules}>
              Start Quiz!
            </button>
          </form>
        </div>
      )}
      {isStarted && <Quiz quizData={quizData} />}
    </div>
  );
}

export default App;
