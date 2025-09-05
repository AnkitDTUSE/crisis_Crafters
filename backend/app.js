// packages && models import
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const studentModel = require("./models/student.js");
const adminModel = require("./models/admin.js");
const { escape } = require("querystring");

//main app creation
const app = express();

//setting view engine --> EJS
app.set("view engine", "ejs");

//setting up middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "ssshhh",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());

//routes

// index ('/') route
app.get("/", (req, res) => {
  // res.send("hello gaiis");
  res.render("index");
});

//admin creation route
app.get("/create/admin", async (req, res) => {
  if ((await adminModel.find({})) > 0)
    return res.send("no more than 1 admin is allowed");
  res.render("createAdmin");
});

app.post("/create/admin", (req, res) => {
  let { name, adminId, phnNo, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let admin = await adminModel.create({
        name,
        adminId,
        phnNo,
        password: hash,
      });
      let token = jwt.sign({ adminId }, "ssshhh");
      res.cookie("token", token);
      req.flash("success", "Admin created successfully");
      res.redirect("/login/admin");
    });
  });
});

//new user creation route
app.get("/create/user", (req, res) => {
  res.render("createUser");
});

app.post("/create/user", async (req, res) => {
  let { name, roll, guardian, phnNo1, phnNo2, password } = req.body;

  //checking if the user already existsss
  if (await studentModel.findOne({ roll })) {
    req.flash("error", "user already existed please login");
    res.redirect("/login");
  }

  //hashing the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let newStudent = await studentModel.create({
        name,
        guardian,
        roll,
        phnNo1,
        phnNo2,
        password: hash,
      });
      let token = jwt.sign({ roll, userId: newStudent._id }, "ssshhhhh");
      res.cookie("token", token);
      req.flash("success", "user created successfully, please login");
      res.redirect("/login");
    });
  });
});

//login route
app.get("/login", (req, res) => {
  res.render("login", {
    error: req.flash("error"),
    success: req.flash("success"),
  });
});

app.post("/login", async (req, res) => {
  let { name, roll, password } = req.body;
  try {
    let user = await studentModel.findOne({ roll });

    //login detail check and comparision of passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ roll, userId: user._id }, "ssshhhhh");
        res.cookie("token", token);
        res.redirect("/welcome");
      } else {
        req.flash("error", "Invalid Inputs");
        res.redirect("/login");
      }
    });
  } catch (err) {
    req.flash("error", "No such user");
    res.redirect("/login");
  }
});

//login admin route
app.get("/login/admin", (req, res) => {
  res.render("loginAdmin", {
    error: req.flash("error"),
    success: req.flash("success"),
  });
});

app.post("/login/admin", async (req, res) => {
  let { name, adminId, password } = req.body;
  try {
    let admin = await adminModel.findOne({ adminId });

    //login detail check and comparision of passwords
    bcrypt.compare(password, admin.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ adminId }, "ssshhhhh");
        res.cookie("token", token);
        res.redirect("/welcome/admin");
      } else {
        req.flash("error", "Invalid Inputs");
        res.redirect("/login/admin");
      }
    });
  } catch (err) {
    req.flash("error", "No such user");
    res.redirect("/login/admin");
  }
});

// TEST WELCOME SCREEN
app.get("/welcome", isloggedIn, (req, res) => {
  res.render("welcomeStudent");
});

app.get("/welcome/admin", isloggedIn, (req, res) => {
  res.render("welcomeAdmin");
});

//logout route
app.get('/logout',(req,res)=>{
  res.clearCookie("token");
  req.flash("success","logout successfull, want to login again?")
  res.redirect("/login")
})


//protected route logic (isloggedIn middleware)
function isloggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error", "Please log in first");
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "ssshhhhh");
    req.user = data;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    req.flash("error", "Session expired. Please log in again.");
    return res.redirect("/login");
  }
}

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
