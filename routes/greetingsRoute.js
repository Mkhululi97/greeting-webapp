export default function GreetingsRoutes(factoryFunction) {
  async function home(req, res) {
    try {
      req.flash("errorText", factoryFunction.currentErrorMsg());
      res.render("home", {
        // use the factory function thats responsible for returning greet
        //   messages. Set it to a variable to be used in the template.
        // greetMsg: Greet.userGreetedIn(),
        greetMsg: factoryFunction.userGreetedIn(),
        /* ------------------- DATABASE WORK ------------------- */
        // use the factory function thats responsible for returning greet
        //   people counted. Set it to a variable to be used in the template.
        // counter: await Greet.peopleGreeted(),
        counter: await factoryFunction.peopleGreeted(),
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
      factoryFunction.greetUserWithLanguage(language, username);
      factoryFunction.displayErrorMsg(username, language);

      /* ------------------- DATABASE WORK ------------------- */
      await factoryFunction.peopleCounter(username);
      /* ------------------- DATABASE WORK ------------------- */
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function greeted(req, res) {
    try {
      // create a array with all greeted users
      let usersArr = await factoryFunction.getGreetedUsers();
      // send array to handlebars template on the greeted.handlebars file
      res.render("greeted", { users: usersArr });
    } catch (err) {
      console.log(err);
    }
  }
  async function userCounter(req, res) {
    try {
      // get current user
      let user = req.params.currentUsername;
      // retrieve data from Factory Function, about how many times
      //   the current user has been greeted.
      let userCounterObj = await factoryFunction.getNamesCountMap(user);
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
      factoryFunction.resetCounter();
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
