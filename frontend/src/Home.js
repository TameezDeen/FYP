import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import axios from "axios";
import DanceingPic from "./assets/dancingpic.png";
import WavesPic from "./assets/wavespic.png";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [_id, setID] = useState("");
  const [age, setAge] = useState("");
  const [languagePreference, setLang] = useState("");

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/user/details", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log(response.data);

        const { name, age, _id, languagePreference } = response.data;
        setName(name);
        setAge(age);
        setID(_id);
        setLang(languagePreference);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div className="page-container">
      <div>
        <div>
          {/* Conditionally render welcome message based on user status */}
          {user ? (
            <h1 className="welcome-text">Welcome {name}!</h1>
          ) : (
            <h1 className="welcome-text">Welcome!</h1>
          )}
        </div>
      </div>
      <div className="waves-image-container">
        <img src={WavesPic} alt="" className="waves__img" />
        <div className="dancing-image-container">
          <img src={DanceingPic} alt="" className="dancing__img" />
        </div>
      </div>
      <div className="navi-section">
        {/* Conditionally render login and signup links based on user status */}
        {!user ? (
          <>
            <Link className="navigation-button" to="/login">
              Login
            </Link>
            <Link className="navigation-button" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* Logout button when user is logged in */}
            <button className="navigation-button" onClick={handleClick}>
              Logout
            </button>
            {/* Render "Questionnaire" link only when user is logged in */}
            <Link className="navigation-button" to="/questionnaire">
              Questionnaire
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
