import React, { useEffect, useState, useLayoutEffect } from "react";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import QuestionnaireCard from "../../components/QuestionnaireCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Data } from "../../assets/QuestionData";
import Sidepannel from "./Sidepannel";
import {
  updatePanelHeight,
  updateMarkingSchemeHeight,
  updateTextHeight,
} from "./DesignFunctions";
import Swal from "sweetalert2";

const QuestionSet = ({ questions, updateAnswers }) => {
  return <QuestionnaireCard data={questions} updateAnswers={updateAnswers} />;
};

const Questionnaire = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [panelHeight, setPanelHeight] = useState(0);
  const [markingSchemeHeight, setMarkingSchemeHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const navigate = useNavigate();
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [answers, setAnswers] = useState({});
  const [_id, setID] = useState("");

  //Personality vs Music Category Mapping
  const personalityCategoryMapping = {
    Openness: [
      "Mellow",
      "Unpretentious",
      "Sophisticated",
      "Intense",
      "Contemporary",
    ],
    Conscientiousness: [
      "Mellow",
      "Unpretentious",
      "Sophisticated",
      "Contemporary",
    ],
    Extraversion: [
      "Mellow",
      "Unpretentious",
      "Sophisticated",
      "Intense",
      "Contemporary",
    ],
    Agreeableness: ["Mellow", "Sophisticated"],
    Neuroticism: ["Sophisticated"],
  };

  //Music category vs genre mapping
  const categoryGenreMapping = {
    Mellow: ["Electronic", "Dance", "New age"],
    Unpretentious: ["Pop", "Country", "Religious"],
    Sophisticated: ["Blues", "Jazz", "Folk", "Classical", "Gospel"],
    Intense: ["Rock", "Punk", "Heavy Metal"],
    Contemporary: ["Rap", "R&B", "Reggae"],
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          const response = await axios.get("/api/user/details", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const { name, _id } = response.data;
          setName(name);
          setID(_id);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [user]);

  useLayoutEffect(() => {
    // Call the function on mount and whenever the window is resized
    updatePanelHeight(setPanelHeight);
    updateMarkingSchemeHeight(setMarkingSchemeHeight);
    updateTextHeight(setTextHeight);

    //window.addEventListener("resize", updatePanelHeight);
    window.addEventListener("resize", () => {
      updatePanelHeight(setPanelHeight);
      updateMarkingSchemeHeight(setMarkingSchemeHeight);
      updateTextHeight(setTextHeight);
    });

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updatePanelHeight);
      window.removeEventListener("resize", updateMarkingSchemeHeight);
      window.removeEventListener("resize", updateTextHeight);
    };
  }, []);

  // Calculate the top position of the marking-scheme
  let markingSchemeTop = 20;
  if (window.innerWidth <= 576) {
    markingSchemeTop = panelHeight * 1.1 + 15; // Adjust this value as needed
  }

  // Calculate the top position of the marking-scheme2
  let markingScheme2Top = 20;
  if (window.innerWidth <= 768) {
    markingScheme2Top = panelHeight * 1.1; // Adjust this value as needed
  }

  let text1Top = markingSchemeHeight + 35; // Adjust this value as needed

  if (window.innerWidth <= 576) {
    text1Top = panelHeight + markingSchemeHeight + 45;
  }

  let cardContainerTop = text1Top + textHeight + 22;

  //function to caluculate score
  const calculateScores = (answers) => {
    const scores = {
      Extraversion: 0,
      Neuroticism: 0,
      Openness: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
    };

    const reverseScoreMap = {
      1: 5,
      2: 4,
      3: 3,
      4: 2,
      5: 1,
    };

    const reverseQuestionIds = [
      6, 21, 31, 2, 12, 27, 37, 8, 23, 43, 9, 24, 34, 35, 41,
    ];

    for (const questionId in answers) {
      const answer = answers[questionId];
      const isReverse = reverseQuestionIds.includes(parseInt(questionId));
      const score = isReverse ? reverseScoreMap[answer] : Number(answer);

      if (
        questionId == 1 ||
        questionId == 6 ||
        questionId == 11 ||
        questionId == 16 ||
        questionId == 21 ||
        questionId == 26 ||
        questionId == 31 ||
        questionId == 36
      ) {
        scores.Extraversion += score;
      } else if (
        questionId == 2 ||
        questionId == 7 ||
        questionId == 12 ||
        questionId == 17 ||
        questionId == 22 ||
        questionId == 27 ||
        questionId == 32 ||
        questionId == 37 ||
        questionId == 42
      ) {
        scores.Agreeableness += score;
      } else if (
        questionId == 3 ||
        questionId == 8 ||
        questionId == 13 ||
        questionId == 18 ||
        questionId == 23 ||
        questionId == 28 ||
        questionId == 33 ||
        questionId == 38 ||
        questionId == 43
      ) {
        scores.Conscientiousness += score;
      } else if (
        questionId == 4 ||
        questionId == 9 ||
        questionId == 14 ||
        questionId == 19 ||
        questionId == 24 ||
        questionId == 29 ||
        questionId == 34 ||
        questionId == 39
      ) {
        scores.Neuroticism += score;
      } else if (
        questionId == 5 ||
        questionId == 10 ||
        questionId == 15 ||
        questionId == 20 ||
        questionId == 25 ||
        questionId == 30 ||
        questionId == 35 ||
        questionId == 40 ||
        questionId == 41 ||
        questionId == 44
      ) {
        scores.Openness += score;
      }
    }
    return scores;
  };

  const scores = calculateScores(answers);

  const totalSum =
    scores.Extraversion +
    scores.Agreeableness +
    scores.Conscientiousness +
    scores.Neuroticism +
    scores.Openness;

  const avgScore = totalSum / 5;

  console.log(scores);
  console.log("Total Sum:", totalSum);
  console.log("Average:", avgScore);

  const handleNextClick = () => {
    const currentSetQuestions = Data.slice(
      (currentSet - 1) * 11,
      currentSet * 11
    );
    const unansweredQuestions = currentSetQuestions.filter(
      (question) => !answers[question.id]
    );
    if (unansweredQuestions.length > 0) {
      Swal.fire({
        icon: "error",
        text: "Please answer all questions before proceeding.",
        confirmButtonColor: "#00e4ae",
      });
      return;
    }

    if (currentSet < 4) {
      setCurrentSet((prevSet) => prevSet + 1);
    } else {
      setShowContinueButton(true);
    }
  };

  //Function to handle the continue click
  const handleContinueClick = async () => {
    const currentSetQuestions = Data.slice(
      (currentSet - 1) * 11,
      currentSet * 11
    );
    const unansweredQuestions = currentSetQuestions.filter(
      (question) => !answers[question.id]
    );

    if (unansweredQuestions.length > 0) {
      Swal.fire({
        icon: "error",
        text: "Please answer all questions before proceeding.",
        confirmButtonColor: "#00e4ae",
      });
      return;
    }

    const aboveAverageTraits = Object.keys(scores).filter(
      (trait) => scores[trait] > avgScore
    );

    console.log("Personality Traits Above Average:", aboveAverageTraits);
    
    const relatedGenres = [];
    aboveAverageTraits.forEach((trait) => {
      const relatedCategories = personalityCategoryMapping[trait];
      
      // const relatedGenres = relatedCategories.flatMap(
      //   (category) => categoryGenreMapping[category]
      // );
      relatedGenres.push(
        ...relatedCategories.flatMap((category) => categoryGenreMapping[category])
      );

      console.log(`Related Categories for ${trait}:`, relatedCategories);
      console.log(`Related Genres for ${trait}:`, relatedGenres);
    });

    try {
      await axios.post(
        "/api/user/save-scores",
        {
          userId: _id,
          scores: scores,
          totalSum: totalSum,
          avgScore: avgScore,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token here
          },
        }
      );
      setCurrentSet((prevSet) => prevSet + 1);
      setShowContinueButton(false);
      //send the answers to songspage
      navigate("/songspage", {
        state: {
          answers: answers,
          scores: scores,
          totalSum: totalSum,
          avgScore: avgScore,
          aboveAverageTraits: aboveAverageTraits,
          relatedGenres: relatedGenres,
        },
      });
      console.log("Current Set after continue:", currentSet);
    } catch (error) {
      console.error("Error saving scores:", error);
    }
  };

  useEffect(() => {
    if (currentSet === 4) {
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  }, [currentSet]);

  // Function to save the answer
  const handleQuestionAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
    //console.log("Answers:", answers);
  };

  return (
    <div className="home-container">
      <div className="sidepannel-container">
        <Sidepannel name={name} />
      </div>
      <div className="marking-scheme" style={{ top: `${markingSchemeTop}px` }}>
        <ul className="score-list grid">
          <li className="score_item">
            Disagree strongly <br /> 1
          </li>
          <li className="score_item">
            Disagree a little <br /> 2
          </li>
          <li className="score_item">
            Neither agree nor disagree <br /> 3
          </li>
          <li className="score_item">
            Agree a little
            <br /> 4
          </li>
          <li className="score_item">
            Agree strongly <br /> 5
          </li>
        </ul>
      </div>
      <div
        className="marking-scheme2"
        style={{ top: `${markingScheme2Top}px` }}
      >
        <ul className="score-list2 grid">
          <li className="score_item2">Disagree strongly 1</li>
          <li className="score_item2">Disagree a little 2</li>
          <li className="score_item2">Neither agree nor disagree 3</li>
          <li className="score_item2">Agree a little 4</li>
          <li className="score_item2">Agree strongly 5</li>
        </ul>
      </div>
      <div className="text1" style={{ top: `${text1Top}px` }}>
        <h1>I see Myself as Someone Who...</h1>
      </div>

      <div
        className="questionnaire-container"
        style={{ top: `${cardContainerTop}px` }}
      >
        <div className="card-container">
          {currentSet === 1 && (
            <QuestionSet
              questions={Data.slice(0, 11)}
              updateAnswers={handleQuestionAnswer}
            />
          )}
          {currentSet === 2 && (
            <QuestionSet
              questions={Data.slice(11, 22)}
              updateAnswers={handleQuestionAnswer}
            />
          )}
          {currentSet === 3 && (
            <QuestionSet
              questions={Data.slice(22, 33)}
              updateAnswers={handleQuestionAnswer}
            />
          )}
          {currentSet === 4 && (
            <QuestionSet
              questions={Data.slice(33, 44)}
              updateAnswers={handleQuestionAnswer}
            />
          )}
        </div>

        <div className="card-container-next-button">
          {/* Next button */}
          {showContinueButton && (
            <button className="next-button" onClick={handleContinueClick}>
              Continue
            </button>
          )}

          {/* Conditionally render Next button */}
          {currentSet < 4 && !showContinueButton && (
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
