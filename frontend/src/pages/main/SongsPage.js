import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Songspage = () => {
  const location = useLocation();
  const { answers, scores, totalSum, avgScore } = location.state; // Get the passed answers from state
  const navigate = useNavigate();


  const goToHome = () => {
    navigate("/");
    }
  // Render the answers and question IDs
  return (
    <div>
      <h2>Perosonality Scores</h2>
      <p>Extraversion: {scores.Extraversion}</p>
      <p>Neuroticism: {scores.Neuroticism}</p>
      <p>Openness: {scores.Openness}</p>
      <p>Agreeableness: {scores.Agreeableness}</p>
      <p>Conscientiousness: {scores.Conscientiousness}</p>

      <button className="next-button" onClick={goToHome}>
        Next
      </button>
      {/* <h2>Your Answers:</h2>
      <ul>
        {Object.keys(answers).map((questionId) => (
          <li key={questionId}>
            Question ID: {questionId}, Answer: {answers[questionId]}
          </li>
        ))}
      </ul> */}
      {/* Additional content for the songspage */}
    </div>
  );
};

export default Songspage;
