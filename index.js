/* ##### BRING IN EXPRESS ##### */
import express from "express";
/* ##### BRING IN HANDLEBARS ##### */
import { engine } from "express-handlebars";
/* ##### BRING IN BOBYPARSER ##### */
import bodyParser from "body-parser";
/* ##### BRING IN EXPRESS-FLASH ##### */
import flash from "express-flash";
/* ##### BRING IN EXPRESS-SESSION ##### */
import session from "express-session";
/* ##### BRING IN FACTORY FUNCTION ##### */
import greet from "./Greet.js";

/* -------------------- ALL INSTANCES -------------------- */
/* INITIALIZE EXPRESS */
const app = express();
/* INITIALIZE GREET FACTORY FUNCTION */
const Greet = greet();
/* -------------------- ALL INSTANCES -------------------- */

/* -------------------- SETUP ENGINE -------------------- */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

/* -------------------- GET ACCESS TO OUR STATIC FILES -------------------- */
app.use(express.static("public"));

/* -------------------- USE BODY PARSER -------------------- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/* -------------------- USE BODY PARSER -------------------- */

/* -------------------- USE SEESION MIDDLEWARE -------------------- */
app.use(
  session({
    secret: "codingmkhululi",
    resave: true,
    saveUninitialized: true,
  })
);
/* -------------------- USE FLASH MIDDLEWARE -------------------- */
app.use(flash());

// How to use express flash
// app.get("/", function (req, res) {
//   req.flash("message", "Success Message!!");
//   res.redirect("/profile");
// });
// app.get("/profile", (req, res) => {
//   res.send(req.flash("message"));
// });
// app.get("/payment", (req, res) => {
// first para is for message variable and second para
//    is for the actual message.
// req.flash("payment", "make the payments");
// retrieve the actual message, by using the
//    message variable name.
// res.send(req.flash("payment"));
// });
// How to use express flash

/* -------------------- ALL ROUTES -------------------- */

// CREATE HOME/DEFAULT ROUTE
app.get("/", function (req, res) {
  req.flash("errorText", Greet.currentErrorMsg());
  res.render("home", {
    // use factory function responsible for returning greet
    //   messages. Set it to a variable to be used
    //   in the template.
    greetMsg: Greet.userGreetedIn(),
    counter: Greet.peopleGreeted(),
  });
  // error: Greet.currentErrorMsg(),
});
// CREATE ROUTE THAT SENDS DATA TO THE SERVER
app.post("/greetings", function (req, res) {
  // send username, language, error message
  //   to server each time 'greet btn' is clicked.
  Greet.greetUserWithLanguage(req.body.language, req.body.userInput);
  Greet.peopleCounter(req.body.userInput);
  Greet.displayErrorMsg(req.body.userInput, req.body.language);
  // console.log(`lan:=>${req.body.language},nam:=>${req.body.userInput === ""}`);
  res.redirect("/");
});
// CREATE ROUTE THAT DISPLAYS ALL GREETED USERS
app.get("/greeted", (req, res) => {
  // create a array with all greeted users
  // send array to handlebars template on the greeted.handlebars file
});
// CREATE A ROUTE THAT DISPLAYS HOW MANY TIMES A USER WAS GREETED
app.get("/counter/:currentUsername", (req, res) => {});
// CREATE A ROUTE THAT RESTS THE GREETINGS APP
app.post("/reset", (req, res) => {
  console.log(Greet.resetCounter());
  res.redirect("/");
});
/* -------------------- ALL ROUTES -------------------- */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3012;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`App started at PORT: ${PORT}`);
});
