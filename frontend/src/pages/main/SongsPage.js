import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import MainSidepannel from "./MainSidepannel"
import "./songspage.css";
import { useLogout } from "../../hooks/useLogout";
import axios from "axios";
import MusicCard from "../../components/MusicCard";

const Songspage = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [_id, setID] = useState("");
  const {
    answers,
    scores,
    totalSum,
    avgScore,
    aboveAverageTraits,
    relatedGenres,
    filteredSongs,
  } = location.state; // Get the passed answers from state
  const navigate = useNavigate();
  const { logout } = useLogout();

  const goToHome = () => {
    navigate("/");
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

  const handleLogoutClick = () => {
    logout();
  };

  // Render the answers and question IDs
  return (
    <div className="home-container">
      <div className="sidepannel-container">
        <MainSidepannel name={name} />
      </div>
      <div className="musiccard-container">
        <MusicCard song="abc" artist="abc" cat="abc"/>
      </div>
      
      {/* <h3>Filtered Songs:</h3>
      <ul>
        {filteredSongs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul> */}

      <button className="next-button" onClick={goToHome}>
        Home
      </button>
      <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      
    </div>
  );
};


export default Songspage;
