export default function GreetingsRoutes(factoryFunc, dbFunc) {
  async function home(req, res) {
    try {
      // req.flash("success", "Names successesfully deleted from storage.");
      req.flash("errorText", factoryFunc.currentErrorMsg());
      res.render("home", {
        // use the factory function thats responsible for returning greet
        //   messages. Set it to a variable to be used in the template.
        greetMsg: factoryFunc.userGreetedIn(),
        /* ------------------- DATABASE WORK ------------------- */
        // use the factory function thats responsible for returning greet
        //   people counted. Set it to a variable to be used in the template.
        counter: await dbFunc.peopleGreeted(),
        /* ------------------- DATABASE WORK ------------------- */
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function greetings(req, res) {
    try {
      // send username, language, error message
      //   to server each time 'greet btn' is clicked.
      let username = req.body.userInput;
      let language = req.body.language;
      factoryFunc.greetUserWithLanguage(language, username);
      factoryFunc.displayErrorMsg(username, language);

      /* ------------------- DATABASE WORK ------------------- */
      await dbFunc.peopleCounter(username, language);
      /* ------------------- DATABASE WORK ------------------- */
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function greeted(req, res) {
    try {
      // create a array with all greeted users
      let usersArr = await dbFunc.getGreetedUsers();
      // send array to handlebars template on the greeted.handlebars file
      res.render("greeted", { users: usersArr });
    } catch (err) {
      // console.log(err.message + " please add user or more");
    }
  }
  async function userCounter(req, res) {
    try {
      // get current user
      let user = req.params.currentUsername;
      // retrieve data from Factory Function, about how many times
      //   the current user has been greeted.
      let userCounterObj = await dbFunc.getNamesCountMap(user);
      // select the value of the user_counter from the result
      //   of retrieving data from the factory function.
      let timesGreeted = userCounterObj["user_counter"];
      // create a string that shows how many times a user has been greeted.
      let userMsg = `Hello, ${user} has been greeted ${timesGreeted} time/s`;
      res.render("greeted", { greetedTimesMsg: userMsg });
    } catch (err) {
      console.log(err);
    }
  }
  async function reset(req, res) {
    try {
      // alert("alert works");
      req.flash("clearDbText", factoryFunc.clearDbMsg());

      factoryFunc.resetMessages();
      await dbFunc.resetCounter();
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  return {
    home,
    greetings,
    greeted,
    userCounter,
    reset,
  };
}
