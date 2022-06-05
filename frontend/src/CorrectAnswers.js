import React, { useState, useEffect } from "react";
import SingleCorrectAnswerOption from "./SingleCorrectAnswerOption";

const CorrectAnswers = ({ questionId, quizzes_id, setActiveContainer }) => {
  // console.log("questionID from CorrectAnswers", questionId);
  // console.log("quizzes_id from CorrectAnswers", quizzes_id);
  const [answerOptionsList, setAnswerOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleCorrectAnswerSubmit = async (e) => {
    e.preventDefault();
    const submitCorrectAnswer = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options`, //testing URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions_id: questionId,
          correct: true,
          answer_text: correctAnswer,
        }),
      }
    );
    const getCorrectAnswerSubmitted = await submitCorrectAnswer.json();
    console.log("Set Active Correct Answers:", getCorrectAnswerSubmitted);
    setAnswerOptionsList(getCorrectAnswerSubmitted);
    // setActiveContainer("AddQuestion");
    console.log("New Correct Answer Added");
  };
  const getAnswerOptions = async () => {
    const response = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options` //testing URL
    );
    const responseAnswerOptions = await response.json();
    setAnswerOptionsList(responseAnswerOptions);
    // console.log(
    //   `All answers options from Quiz:${quizzes_id} & Question:${questionId}`,
    //   answerOptionsList
    // );
  };

  useEffect(() => {
    getAnswerOptions();
  }, []);

  return (
    <React.Fragment>
      <div className="correct-answer-options">
        <span className="single-answer-option">
          {answerOptionsList.map((answer) => {
            return (
              <SingleCorrectAnswerOption
                key={answer.id}
                {...answer}
                setAnswerOptionsList={setAnswerOptionsList}
                answerOptionsList={answerOptionsList}
              />
            );
          })}
        </span>

        <div>
          {showInput ? (
            <div>
              <input
                type="text"
                className="correct-answer-option-input"
                placeholder="Insert correct answer option"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
              <button
                type="button"
                className="btn-enter-correct-answer"
                onClick={handleCorrectAnswerSubmit}
              >
                Enter
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="btn-container-correct-answer">
          <button
            type="button"
            className="btn-add-correct-answer"
            onClick={() => setShowInput(!showInput)}
          >
            +Add Correct Answer
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CorrectAnswers;
