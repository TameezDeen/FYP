import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./songspage.css";
import { useLogout } from "../../hooks/useLogout";

const Songspage = () => {
  const location = useLocation();
  const {
    answers,
    scores,
    totalSum,
    avgScore,
    aboveAverageTraits,
    relatedGenres,
    filteredSongs,
  } = location.state; // Get the passed answers from state
  const navigate = useNavigate();
  const { logout } = useLogout();

  const goToHome = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
  };
  // Render the answers and question IDs
  return (
    <div>
      {/* <h2>Perosonality Scores</h2>
      <p>Extraversion: {scores.Extraversion}</p>
      <p>Neuroticism: {scores.Neuroticism}</p>
      <p>Openness: {scores.Openness}</p>
      <p>Agreeableness: {scores.Agreeableness}</p>
      <p>Conscientiousness: {scores.Conscientiousness}</p>
      <p>AvgScore: {avgScore}</p>
      <h3>Use scored high on:</h3>
      <ul>
        {aboveAverageTraits.map((trait) => (
          <li key={trait}>{trait}</li>
        ))}
      </ul> */}
      <h3>Music Genres that match your personality</h3>

      <ul className="genre-list">
        {[...new Set(relatedGenres)].map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>

      <h3>Filtered Songs:</h3>
      <ul>
        {filteredSongs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>

      <button className="next-button" onClick={goToHome}>
        Home
      </button>
      <button className="logout-button" onClick={handleLogoutClick}>
          Logout
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
