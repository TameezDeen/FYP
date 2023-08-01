import React, { useEffect, useState, useLayoutEffect} from "react";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import QuestionnaireCard from "../../components/QuestionnaireCard";
import axios from "axios";
import { Data } from "../../assets/QuestionData";
import Sidepannel from "./Sidepannel";

const Questionnaire = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [panelHeight, setPanelHeight] = useState(0);
  const [markingSchemeHeight, setMarkingSchemeHeight] = useState(0);
  //const [textHeight, setTextHeight] = useState(0);

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

  // Function to update the panel height state
  const updatePanelHeight = () => {
      const panelElement = document.querySelector(".panel");
      if (panelElement) {
        setPanelHeight(panelElement.offsetHeight);
      }
  };

  // Function to update the  markingScheme height state
  const updateMarkingSchemeHeight = () => {
    const markingSchemeElement = document.querySelector(".marking-scheme");
    if (markingSchemeElement) {
      setMarkingSchemeHeight(markingSchemeElement.offsetHeight);
    }
  };

  // const updateTextHeight = () => {
  //   const textElement = document.querySelector(".text1");
  //   if (textElement) {
  //     setTextHeight(textElement.offsetHeight);
  //   }
  // }

  useLayoutEffect(() => {
    // Call the function on mount and whenever the window is resized
    updatePanelHeight();
    updateMarkingSchemeHeight();
    //updateTextHeight();

    //window.addEventListener("resize", updatePanelHeight);
    window.addEventListener("resize", () => {
      updatePanelHeight();
      updateMarkingSchemeHeight();
      //updateTextHeight();
    });

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updatePanelHeight);
      window.removeEventListener("resize", updateMarkingSchemeHeight);
      //window.removeEventListener("resize", updateTextHeight)
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

  if(window.innerWidth <= 576){
    text1Top = panelHeight + markingSchemeHeight + 45;
  }

  //let cardContainerTop = textHeight + 22;\

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
      <div className="card-container">
        <QuestionnaireCard data={Data} />
      </div>
    </div>
  );
};

export default Questionnaire;
