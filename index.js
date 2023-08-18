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
import Greet from "./Greet.js";
/* ##### BRING IN THE DATABASE ##### */
import db from "./database.js";
/* ##### BRING IN GREETINGS ROUTE ##### */
import routesFunctions from "./routes/greetingsRoute.js";

/* INITIALIZE EXPRESS */
const app = express();
/* -------------------- ALL INSTANCES -------------------- */

/* INITIALIZE GREET FACTORY FUNCTION */
// const Greet = greet(db);
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
const factoryFunction = Greet(db);
const greetingsRoute = routesFunctions(factoryFunction);
app.get("/", greetingsRoute.home);
// CREATE ROUTE THAT SENDS DATA TO THE SERVER
app.post("/greetings", greetingsRoute.greetings);
// CREATE ROUTE THAT DISPLAYS ALL GREETED USERS
app.get("/greeted", greetingsRoute.greeted);
// CREATE A ROUTE THAT DISPLAYS HOW MANY TIMES A USER WAS GREETED
app.get("/counter/:currentUsername", greetingsRoute.userCounter);
// CREATE A ROUTE THAT RESTS THE GREETINGS APP
app.post("/reset", greetingsRoute.reset);

/* -------------------- ALL ROUTES -------------------- */
// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3012;
// GET NOTIFICATION WHEN APP SUCCESSFULLY STARTS
app.listen(PORT, function () {
  console.log(`App started at PORT: ${PORT}`);
});
