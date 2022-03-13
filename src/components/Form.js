import React from "react";

export default function Form({
  handleChange,
  handleSubmitRules,
  formData,
  categories,
}) {
  return (
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
            <option key={category.id} value={category.id} id={category.id}>
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
  );
}
