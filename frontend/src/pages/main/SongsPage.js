import React from "react";
import { useLocation } from "react-router-dom";

const Songspage = () => {
  const location = useLocation();
  const answers = location.state; // Get the passed answers from state

  // Render the answers and question IDs
  return (
    <div>
      <h2>Your Answers:</h2>
      <ul>
        {Object.keys(answers).map((questionId) => (
          <li key={questionId}>
            Question ID: {questionId}, Answer: {answers[questionId]}
          </li>
        ))}
      </ul>
      {/* Additional content for the songspage */}
    </div>
  );
};

export default Songspage;
