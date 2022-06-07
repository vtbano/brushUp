import React, { useState, useEffect } from "react";
import SingleQuiz from "./SingleQuiz";
import QuizQuestions from "./QuizQuestions";

const Quizzes = ({ setActiveContainer, creator }) => {
  // console.log("Quizzes Creator", creator);
  const { id, username } = creator;
  const url = `creators/1/quizzes`; //set for testing- DONT Change until Create Login is setup
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await fetch(url);
    const responseQuizzes = await response.json();
    setQuizzes(responseQuizzes);

    // console.log("All quizzes from specific Creator:",responseQuizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleDelete = async (id) => {
    const submitQuizDelete = await fetch(`/quizzes/${id}`, {
      method: "DELETE",
    });
    console.log(submitQuizDelete);
    await getQuizzes();
  };

  const handleRedirectQuizQuestions = (quizId, creator_id, title) => {
    <QuizQuestions quizId={quizId} creator_id={creator_id} title={title} />;

    // const response = await fetch(`quizzes/${id}/questions`);
    // const activeQuizQuestions = await response.json();
    // setQuestions(activeQuizQuestions);
    // console.log(activeQuizQuestions);
    setActiveContainer("QuizQuestions");
  };

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="creator-welcome">Ready to Brush Up {username}</div>
        <div className="quiz-shelf-title">QUIZ SHELF</div>
        <div className="quiz-shelf-display">
          <div className="quizzes-container-name">
            My Quizzes
            <div className="quizzes-container">
              <div className="quizzes-single-quiz-container">
                {quizzes.map((quiz) => {
                  return (
                    <SingleQuiz
                      key={quiz.id}
                      {...quiz}
                      setQuizzes={setQuizzes}
                      handleDelete={() => handleDelete(quiz.id)}
                      handleRedirectQuizQuestions={() =>
                        handleRedirectQuizQuestions(quiz.id, id, quiz.title)
                      }
                      setActiveContainer={setActiveContainer}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                className="btn-create-quiz"
                onClick={() => setActiveContainer("CreateQuiz")}
              >
                +Create Quiz
              </button>
            </div>
          </div>
          <div className="quizzes-container-name">
            Shared Quizzes
            <div className="share-container">
              {/* when empty it display's a greyed out share img */}
              <img
                src="./img/icons8-noShareFade-96 (1).png"
                alt="Greyed-out share button"
                className="greyed-share-button"
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Quizzes;
