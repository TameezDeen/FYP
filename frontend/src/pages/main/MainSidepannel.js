import React from "react";
import "./mainsidepannel.css";


const MainSidepannel = ({ name }) => {
  return (
    <div className="sidepanel">
      <div className="sidepannel-content">
        <div className="content1">
          <i class="bx bxs-user-circle user-icon"></i>
          <p className="greetings1">
            Hello! {name} <br /> Welcome to <br />
            <span className="app-name">TuneHub</span>
          </p>
        </div>
        <p className="greetings2">
          "Discover music that matches your unique personality traits! Please
          take a moment to answer the Big Five Inventory questions to receive
          personalized music recommendations."
        </p>
      </div>
    </div>
  );
};

export default MainSidepannel;
