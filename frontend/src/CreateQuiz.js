import React, { useEffect, useState } from "react";
import QuizQuestions from "./QuizQuestions";
const url = "/quizzes"; //MAKE POST METHOD

const CreateQuiz = ({ setQuizzes, setActiveContainer, creator }) => {
  console.log("CreateQuiz Creator", creator);
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, username } = creator;

    const quizTitle = { title };
    const creator_id = id; //MUST ADD creaters_id properly
    fetch("/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizTitle, creator_id),
    }).then(() => {
      console.log("New Quiz Added");
    });

    setActiveContainer("QuizQuestions");
    <QuizQuestions quizTitle={quizTitle} creator={creator} />;
  };

  return (
    <React.Fragment>
      <section className="create-quiz-sect">
        <div className="create-quiz-title">CREATE QUIZ</div>
        <div className="create-quiz-display">
          <span className="create-quiz-label">Quiz Title</span>
          <form>
            <input
              type="text"
              className="create-quiz-title-input"
              placeholder=" Enter Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <button
            type="submit"
            className="btn-save-quiz"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateQuiz;
