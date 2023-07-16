import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./questionnaire.css";
import { useAuthContext } from "../../hooks/useAuthContext"
import Sidepannel from "../../components/Sidepannel";
import axios from "axios";

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
      <div className="text1">
        <h1>I see Myself as Someone Who...</h1>
      </div>
      {/* nav container */}
      <div className="marking-scheme">
        {/* nav__list grid */}
        <ul className="score-list grid">
        {/* nav__item */}
          <li className="score_item">Disagree strongly <br /> 1</li>
          <li className="score_item">Disagree a little <br /> 2</li>
          <li className="score_item">Neither agree nor disagree <br /> 3</li>
          <li className="score_item">Agree a little<br /> 4</li>
          <li className="score_item">Agree strongly <br /> 5</li>
        </ul>
      </div>
    </div>
  );
};

export default Questionnaire;
