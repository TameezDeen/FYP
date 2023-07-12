import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import Sidepannel from "./components/Sidepannel";
//
import axios from "axios";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleClick = () => {
    logout();
  };

  useEffect(() =>{
    const fetchUserDetails = async () =>{
      try{
        const response = await axios.get("/api/user/details", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const {name, age} = response.data;
        setName(name);
        setAge(age);
      }catch (error){
        console.error("Error fetching user details:", error);
      }
    };
    if(user){
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div>
      <div>
        <Sidepannel />
      </div>
      {/* If user is logged in this will show */}
      {user && (
        <div className="details">
          <h2>Email: {user.email}</h2>
          <h2>Name: {name  }</h2>
          <h2>Age: {age}</h2>
        </div>
      )}

      {/* If user is not logged in we can use !user */}
      <div className="nav-section">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <button className="logout-button" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
