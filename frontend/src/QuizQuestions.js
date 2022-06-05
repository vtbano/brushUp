import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
// import ButtonAddQuestion from "./ButtonAddQuestion";

// const url = `quizzes/1/questions`; //use this URL for testing

const QuizQuestions = ({
  setActiveContainer,
  creator,
  id,
  creators_id,
  title,
  setActiveQuestion,
  showQuizQuestions,
  setShowQuizQuestions,
}) => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const response = await fetch(`quizzes/${id}/questions`);
    const activeQuizQuestions = await response.json();
    setQuestions(activeQuizQuestions);
    setShowQuizQuestions("QuizQuestions");
    console.log(activeQuizQuestions);
  };

  useEffect(() => {
    getQuestions();
  }, [showQuizQuestions]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const submitQuestion = await fetch(`/quizzes/${id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizzes_id: id,
        question_text: null,
        image: null,
      }),
    });
    const getQuestionSubmitted = await submitQuestion.json();
    console.log("Set Active Question", getQuestionSubmitted);
    setActiveQuestion(getQuestionSubmitted);
    console.log("New Question Added");
    setActiveContainer("AddQuestion");
  };

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="question-shelf-quiz-title">
          {title}
          <div className="questions-count">{questions.length} questions</div>
        </div>
        <div className="question-shelf-display">
          <div className="questions-container-name">
            My Questions
            <div className="questions-container">
              <div className="questions-single-question-container">
                {questions.map((question) => {
                  return (
                    <SingleQuestion
                      quizId={id}
                      key={question.id}
                      {...question}
                      setQuestions={setQuestions}
                      questions={questions}
                      setShowQuizQuestions={setShowQuizQuestions}
                      setActiveContainer={setActiveContainer}
                    />
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="btn-add-question"
              onClick={handleQuestionSubmit}
            >
              +Add Question
            </button>
            {/* <ButtonAddQuestion
              setActiveContainer={setActiveContainer}
              id={id}
              setActiveQuestion={setActiveQuestion}
            /> */}
          </div>

          <div className="share-quiz-container">
            {/* when empty it display's a greyed out share img */}
            <img
              src="./img/icons8-ToShare-96 (1).png"
              alt="Share button"
              className="share-button"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default QuizQuestions;
