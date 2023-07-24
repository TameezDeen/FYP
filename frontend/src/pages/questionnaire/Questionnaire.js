import React, { useEffect, useState } from "react";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext";
//import Sidepannel from "../../components/Sidepannel";
import QuestionnaireCard from "../../components/QuestionnaireCard";
import axios from "axios";
import { Data } from "../../assets/QuestionData";

import Sidepannel from "./Sidepannel";

const Questionnaire = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");

  //Changes
  const [panelHeight, setPanelHeight] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/user/details", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const { name } = response.data;
        setName(name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  // Function to update the panel height state
  const updatePanelHeight = () => {
    const panelElement = document.querySelector(".panel");
    if (panelElement) {
      setPanelHeight(panelElement.offsetHeight);
    }
  };

  useEffect(() => {
    // Call the function on mount and whenever the window is resized
    updatePanelHeight();
    window.addEventListener("resize", updatePanelHeight);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updatePanelHeight);
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

  return (
    <div className="home-container">
      <div className="sidepannel-container">
        <Sidepannel name={name} />
      </div>
      <div className="marking-scheme" style={{ top: `${markingSchemeTop}px`}}>
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
      <div className="marking-scheme2" style={{ top: `${markingScheme2Top}px`}}>
        <ul className="score-list2 grid">
          <li className="score_item2">Disagree strongly 1</li>
          <li className="score_item2">Disagree a little 2</li>
          <li className="score_item2">Neither agree nor disagree 3</li>
          <li className="score_item2">Agree a little 4</li>
          <li className="score_item2">Agree strongly 5</li>
        </ul>
      </div>
      <div className="text1">
        <h1>I see Myself as Someone Who...</h1>
      </div>
    </div>
  );
};

export default Questionnaire;
