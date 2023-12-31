import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./testpage.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

const Testpage = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [_id, setID] = useState("");

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

        const { name, age, _id } = response.data;
        setName(name);
        setAge(age);
        setID(_id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div>
      {/* If user is logged in this will show */}
      {user && (
        <div className="details">
          <h2>Email: {user.email}</h2>
          <h2>Name: {name}</h2>
          <h2>Age: {age}</h2>
          <h2>ID: {_id}</h2>
        </div>
      )}

      {/* If user is not logged in we can use !user */}
      <div className="nav-section">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/questionnaire">Questionnaire</Link>
        <button className="logout-button" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

// const Testpage = () => {
//     return (
//         <div>
//         <h1>Test Page</h1></div>
//     );
// };
export default Testpage;