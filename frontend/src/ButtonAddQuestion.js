// import React from "react";
// const ButtonAddQuestion = ({ setActiveContainer, id, setActiveQuestion }) => {
//   const handleQuestionSubmit = async (e) => {
//     e.preventDefault();
//     const submitQuestion = await fetch(`/quizzes/1/questions`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         quizzes_id: 1,
//         question_text: null,
//         image: null,
//       }),
//     });
//     const getQuestionSubmitted = await submitQuestion.json();
//     console.log("Set Active Question", getQuestionSubmitted);
//     setActiveQuestion(getQuestionSubmitted);
//     console.log("New Question Added");
//     setActiveContainer("AddQuestion");
//   };

//   return (
//     <React.Fragment>
//       <button
//         type="button"
//         className="btn-add-question"
//         onClick={handleQuestionSubmit}
//       >
//         +Add Question
//       </button>
//     </React.Fragment>
//   );
// };

// export default ButtonAddQuestion;
