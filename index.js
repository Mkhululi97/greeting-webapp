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
const Greet = greet();
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
app.get("/", function (req, res) {
  req.flash("errorText", Greet.currentErrorMsg());
  res.render("home", {
    // use factory function responsible for returning greet
    //   messages. Set it to a variable to be used
    //   in the template.
    greetMsg: Greet.userGreetedIn(),
    counter: Greet.peopleGreeted(),
  });
});
// CREATE ROUTE THAT SENDS DATA TO THE SERVER
app.post("/greetings", async function (req, res) {
  // send username, language, error message
  //   to server each time 'greet btn' is clicked.
  let username = req.body.userInput;
  let language = req.body.language;
  Greet.greetUserWithLanguage(language, username);
  Greet.peopleCounter(username);
  Greet.displayErrorMsg(username, language);
  /* ------------------- DATABASE WORK ------------------- */
  // try to get the database to only store the user once,
  //  if the user is greeted twices, should ignore and
  //  not add the same user twice.
  let greet_counter = Greet.peopleGreeted();
  !(Greet.getNamesCountMap()[username] > 1)
    ? await db.none(
        "insert into users (user_name, greet_counter) values ($1, $2)",
        [username, greet_counter]
      )
    : "";
  /* ------------------- DATABASE WORK ------------------- */
  res.redirect("/");
});
// CREATE ROUTE THAT DISPLAYS ALL GREETED USERS
app.get("/greeted", (req, res) => {
  // create a array with all greeted users
  let usersArr = Greet.getGreetedUsers();
  // send array to handlebars template on the greeted.handlebars file
  res.render("greeted", { users: usersArr });
});
// CREATE A ROUTE THAT DISPLAYS HOW MANY TIMES A USER WAS GREETED
app.get("/counter/:currentUsername", (req, res) => {
  // get current user
  let user = req.params.currentUsername;
  // get how many times current user was greeted.
  let howManyTimesGreeted = Greet.getNamesCountMap()[user];
  // create a string that shows how many times a user has been greeted.
  let userMsg = `Hello, ${user} has been greeted ${howManyTimesGreeted} time/s`;
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
