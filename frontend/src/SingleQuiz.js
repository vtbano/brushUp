import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";

const SingleQuiz = ({
  id,
  title,
  handleDelete,
  setQuizzes,
  handleRedirectQuizQuestions,
}) => {
  // console.log("TITLE:", title, "QUIZ:", id);

  return (
    <React.Fragment>
      <div className="single-quiz-row-container">
        <span
          className="single-quiz-title"
          onClick={handleRedirectQuizQuestions}
        >
          {title}
        </span>
        <span>
          <DeleteQuiz handleDelete={handleDelete} />
          <EditQuiz setQuizzes={setQuizzes} RemoveId={id} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleQuiz;
