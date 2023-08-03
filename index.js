/* ##### BRING IN EXPRESS ##### */
import express from "express";
/* ##### BRING IN HANDLEBARS ##### */
import { engine } from "express-handlebars";
/* ##### BRING IN BOBYPARSER ##### */
import bodyParser from "body-parser";
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

/* -------------------- ALL ROUTES -------------------- */
// CREATE HOME/DEFAULT ROUTE
app.get("/", function (req, res) {
  res.render("home", {
    name: Greet.getName(),
  });
});

// CREATE ROUTE THAT SENDS DATA TO THE SERVER
app.post("/greetings", function (req, res) {
  // send username to server each time 'greet btn' is clicked.
  Greet.setName(req.body.userInput);
  // console.log(req.body.userInput);
  res.redirect("/");
});
/* -------------------- ALL ROUTES -------------------- */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3012;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`App started at PORT: ${PORT}`);
});
