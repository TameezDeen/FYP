import React from "react";
import "./sidepannel.css";
import ProfilePic from "../assets/profilepic.png";
import "../App.css";

const Sidepannel = ({ name }) => {
  return (
    <div className="panel">
      <div className="content1">
        <img src={ProfilePic} alt="" className="profile-pic" />
        <p className="greetings1">
          Hello! {name} <br /> Welcome to <br />
          <span className="app-name">TuneHub</span>
        </p>
        <p className="greetings2">
          "Discover music that matches your unique personality traits! Please
          take a moment to answer the Big Five Inventory questions to receive
          personalized music recommendations."
        </p>
      </div>
    </div>
  );
};

export default Sidepannel;
