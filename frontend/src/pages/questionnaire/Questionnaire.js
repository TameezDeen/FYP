import React, { useEffect, useState, useLayoutEffect } from "react";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import QuestionnaireCard from "../../components/QuestionnaireCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Data } from "../../assets/QuestionData";
import Sidepannel from "./Sidepannel";
import { updatePanelHeight, updateMarkingSchemeHeight, updateTextHeight } from "./DesignFunctions";

const QuestionSet = ({ questions }) => {
  return <QuestionnaireCard data={questions} />;
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user) {
          const response = await axios.get("/api/user/details", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          const { name } = response.data;
          setName(name);
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

  let markingScheme2Top = 20;
  if (window.innerWidth <= 768) {
    markingScheme2Top = panelHeight * 1.1; // Adjust this value as needed
  }

  let text1Top = markingSchemeHeight + 35; // Adjust this value as needed

  if (window.innerWidth <= 576) {
    text1Top = panelHeight + markingSchemeHeight + 45;
  }

  let cardContainerTop = text1Top + textHeight + 22;

  const handleNextClick = () => {
    if (currentSet < 4) {
      setCurrentSet((prevSet) => prevSet + 1);
    } else {
      setShowContinueButton(true);
    }
    console.log("current set", currentSet);
  };

  const handleContinueClick = () => {
    setCurrentSet((prevSet) => prevSet + 1);
    setShowContinueButton(false);
    navigate("/");
    console.log("Current Set after continue:", currentSet);
  };

  useEffect(() => {
    if (currentSet === 4) {
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  }, [currentSet]);

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
          {currentSet === 1 && <QuestionSet questions={Data.slice(0, 11)} />}
          {currentSet === 2 && <QuestionSet questions={Data.slice(11, 22)} />}
          {currentSet === 3 && <QuestionSet questions={Data.slice(22, 33)} />}
          {currentSet === 4 && <QuestionSet questions={Data.slice(33, 44)} />}
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
