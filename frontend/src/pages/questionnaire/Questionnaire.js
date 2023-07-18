import React, { useEffect, useState } from "react";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Sidepannel from "../../components/Sidepannel";
import QuestionnaireCard from "../../components/QuestionnaireCard";
import axios from "axios";
import { Data } from "../../assets/QuestionData"


const Questionnaire = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");

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

  return (
    <div className="home-container">
      <div className="sidepannel-container">
        <Sidepannel name={name} />
      </div> 
      <div className="marking-scheme">
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
      <div className="text1">
        <h1>I see Myself as Someone Who...</h1>
      </div>
      {/* <div className="card-container">
        <QuestionnaireCard data={Data} />
      </div> */}
    </div>
  );
};

export default Questionnaire;
