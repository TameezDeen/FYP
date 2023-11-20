const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//expiresIn: '3d' the user will be logged in for 3days and the token will expire
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //res.json({ mssg: "login user" });
};

//signup user
const signupUser = async (req, res) => {
  const { name, age, email, password, languagePreference } = req.body;

  try {
    const user = await User.signup(name, age, email, password, languagePreference);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ name, age, email, token, languagePreference });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getting user details
const getUserDetails = async (req, res) => {
  try {
    // Retrieve the user ID from the request
    const userId = req.user.id;

    // Find the user in the database based on the ID
    const user = await User.findById(userId, "name age languagePreference");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//saving scores
const saveScores = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const { scores, totalSum, avgScore} = req.body;
  
    console.log("Score tika", scores);

    // Update the user's scores in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { scores, totalSum, avgScore },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save the updated user object to the database
    await user.save();

    console.log("Updated User object:", user);

    return res.status(200).json({ message: "Scores saved successfully." });
  } catch (error) {
    console.error("Error saving scores:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving scores." });
  }
};

module.exports = { signupUser, loginUser, getUserDetails, saveScores };