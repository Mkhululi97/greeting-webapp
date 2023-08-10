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
/* ##### BRING IN PG-PROMISE ##### */
import pgPromise from "pg-promise";

/* -------------------- ALL INSTANCES -------------------- */
/* INITIALIZE EXPRESS */
const app = express();

/* INITIALIZE GREET FACTORY FUNCTION */
const pgp = pgPromise();
/* -------------------- ALL INSTANCES -------------------- */

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
process.env.DATABASE_URL && !local ? (useSSL = true) : "";
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://sampleuser:pg123@localhost:5432/greetings";
//connect to the db
const db = pgp(connectionString);
/* INITIALIZE GREET FACTORY FUNCTION */
const Greet = greet(db);
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
/* -------------------- ALL ROUTES -------------------- */
// CREATE HOME/DEFAULT ROUTE
app.get("/", async function (req, res) {
  req.flash("errorText", Greet.currentErrorMsg());
  res.render("home", {
    // use the factory function thats responsible for returning greet
    //   messages. Set it to a variable to be used in the template.
    greetMsg: Greet.userGreetedIn(),
    /* ------------------- DATABASE WORK ------------------- */
    // use the factory function thats responsible for returning greet
    //   people counted. Set it to a variable to be used in the template.
    counter: await Greet.peopleGreeted(),
    /* ------------------- DATABASE WORK ------------------- */
  });
});
// CREATE ROUTE THAT SENDS DATA TO THE SERVER
app.post("/greetings", async (req, res) => {
  // send username, language, error message
  //   to server each time 'greet btn' is clicked.
  let username = req.body.userInput;
  let language = req.body.language;
  Greet.greetUserWithLanguage(language, username);
  Greet.displayErrorMsg(username, language);

  /* ------------------- DATABASE WORK ------------------- */
  await Greet.peopleCounter(username);
  /* ------------------- DATABASE WORK ------------------- */
  res.redirect("/");
});
// CREATE ROUTE THAT DISPLAYS ALL GREETED USERS
app.get("/greeted", async (req, res) => {
  // create a array with all greeted users
  let usersArr = await Greet.getGreetedUsers();
  // send array to handlebars template on the greeted.handlebars file
  res.render("greeted", { users: usersArr });
});
// CREATE A ROUTE THAT DISPLAYS HOW MANY TIMES A USER WAS GREETED
app.get("/counter/:currentUsername", async (req, res) => {
  // get current user
  let user = req.params.currentUsername;
  // retrieve data from Factory Function, about how many times
  //   the current user has been greeted.
  let userCounterObj = await Greet.getNamesCountMap(user);
  // select the value of the user_counter from the result
  //   of retrieving data from the factory function.
  let timesGreeted = userCounterObj["user_counter"];
  // create a string that shows how many times a user has been greeted.
  let userMsg = `Hello, ${user} has been greeted ${timesGreeted} time/s`;
  res.render("greeted", { greetedTimesMsg: userMsg });
});
// CREATE A ROUTE THAT RESTS THE GREETINGS APP
app.post("/reset", (req, res) => {
  Greet.resetCounter();
  res.redirect("/");
});
/* -------------------- ALL ROUTES -------------------- */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3012;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`App started at PORT: ${PORT}`);
});
