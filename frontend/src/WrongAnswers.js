import React, { useState, useEffect } from "react";
import SingleWrongAnswerOption from "./SingleWrongAnswerOption";

const WrongAnswers = ({
  questionId,
  quizzes_id,
  setActiveContainer,
  showWrongAnswers,
  setShowWrongAnswers,
}) => {
  const [wrongOptionsList, setWrongOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [wrongAnswers, setWrongAnswer] = useState("");
  const [wrongAnswerCount, setWrongAnswerCount] = useState(false);

  //GET CALL
  const getWrongOptions = async () => {
    const response = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options` //testing URL
    );
    const responseAnswerOptions = await response.json();
    const onlyWrongAnswers = responseAnswerOptions.filter(
      (answer) => answer.correct === false
    );
    // console.log("WRONG ANSWERS ONLY:", onlyWrongAnswers);
    setWrongOptionsList(onlyWrongAnswers);
    setShowWrongAnswers("call getAnswerOptions Function");
    if (onlyWrongAnswers.length > 1) {
      setWrongAnswerCount(true);
    }
  };

  useEffect(() => {
    getWrongOptions();
  }, [showWrongAnswers]);

  //HANDLE SUBMIT & POST METHOD

  const handleWrongAnswerSubmit = async (e) => {
    e.preventDefault();
    const submitWrongAnswer = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options`, //testing URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions_id: 1,
          correct: false,
          answer_text: wrongAnswers,
        }),
      }
    );
    const getWrongAnswerSubmitted = await submitWrongAnswer.json();
    console.log("Set Active Wrong Answers:", getWrongAnswerSubmitted);
    setWrongAnswer("");
    setShowWrongAnswers("Add new correct answer option");
    setShowInput(!showInput);
    console.log("New Correct Answer Added");
  };

  return (
    <React.Fragment>
      <div className="wrong-answer-options">
        <span className="single-answer-option">
          {wrongAnswerCount ? (
            <div>
              {wrongOptionsList.map((answer) => {
                return (
                  <SingleWrongAnswerOption
                    key={answer.id}
                    {...answer}
                    setShowWrongAnswers={setShowWrongAnswers}
                    quizzes_id={quizzes_id}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <SingleWrongAnswerOption
                key={wrongOptionsList.id}
                {...wrongOptionsList}
                setShowWrongAnswers={setShowWrongAnswers}
                quizzes_id={quizzes_id}
              />
            </div>
          )}
        </span>

        <div>
          {showInput ? (
            <div>
              <input
                type="text"
                className="wrong-answer-option-input"
                placeholder="Insert wrong answer option"
                value={wrongAnswers}
                onChange={(e) => setWrongAnswer(e.target.value)}
              />
              <button
                type="button"
                className="btn-enter-wrong-answer"
                onClick={handleWrongAnswerSubmit}
              >
                Enter
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="btn-container-wrong-answer">
          <button
            type="button"
            className="btn-add-wrong-answer"
            onClick={() => setShowInput(!showInput)}
          >
            +Add Wrong Answer
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WrongAnswers;
