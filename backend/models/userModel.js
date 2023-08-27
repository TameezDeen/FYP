const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  scores: {
    Extraversion: {
      type: Number,
      default: 0, // You can set a default value if needed
    },
    Neuroticism: {
      type: Number,
      default: 0,
    },
    Openness: {
      type: Number,
      default: 0,
    },
    Agreeableness: {
      type: Number,
      default: 0,
    },
    Conscientiousness: {
      type: Number,
      default: 0,
    },
  },
  totalSum: {
    type: Number,
    default: 0,
  },
  avgScore: {
    type: Number,
    default: 0, 
  }
});

//Static signup method
userSchema.statics.signup = async function (
  name,
  age,
  email,
  password
) {
  // validation
  if (!email || !password || !name || !age) {
    throw Error("All fields must be filled");
  }
  if (!validator.matches(name, /^[A-Za-z\s-]+$/)) {
    throw Error("Invalid name format");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. It should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
  }
  if (!validator.isInt(String(age))) {
    throw Error("Age must be a valid integer");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, age, email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

//'User' is the document name
module.exports = mongoose.model("User", userSchema);
