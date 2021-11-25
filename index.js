const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config/config.env" });

mongoose.connect(
  "mongodb+srv://Mohamed:azerty10741852963@cluster0.p5jd9.mongodb.net/testUser?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/registre", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  const response = await newUser.save();
  res.status(200).json(response);
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.find({ email: email });
  /*if (user.length < 0) {
    res.status(200).json({
      message: "email not found",
    });
    return -1;
  }*/
  try {
    if (user[0].password === password) {
      const token = jwt.sign(
        { email: user[0].email },
        process.env.TOKEN_SECRET
      );
      res.status(200).json({
        email: email,
        token: token,
        message: "Succes",
      });
    } else {
      res.status(200).json({
        message: "Failed",
      });
    }
  } catch (err) {
    return res.status(200).json({
      message: "user not found !",
    });
  }
});

app.listen(3001, () => {
  console.log("listening to port 3001");
});
