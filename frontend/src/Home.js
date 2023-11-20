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
  const [age, setAge]  = useState("");
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

        console.log(response.data)

        const { name, age, _id, languagePreference } = response.data;
        setName(name);
        setAge(age);
        setID(_id);
        setLang(languagePreference)
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
        <h1 className="welcome-text">
          Welcome!
        </h1>
        <h1>Name: {name}</h1>
        <h1>Age: {age}</h1>
        <h1>UserID: {_id}</h1>
        <h1>Language: {languagePreference}</h1>
      </div>
      <div className="waves-image-container">
        <img src={WavesPic} alt="" className="waves__img" />
        <div className="dancing-image-container">
          <img src={DanceingPic} alt="" className="dancing__img" />
        </div>
      </div>
      <div className="navi-section">
        <Link className="navigation-button" to="/login">Login</Link>
        <Link className="navigation-button" to="/signup">Signup</Link>
        <Link className="navigation-button" to="/questionnaire">Questionnaire</Link>
        <button className="logout-button" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
