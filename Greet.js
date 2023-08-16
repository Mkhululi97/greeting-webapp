export default function Greet(db) {
  let greetCounter = 0;
  let users = [];
  let usernameTrimmed = "";
  let greetMsg = "";
  let errorMsg = "";
  let firstLetter, restOfLetters;
  const lettersOnlyRegex = /^[a-zA-Z]+$/;

  /* --------------------------- MY ASYNC FUNCTIONS  ---------------------------*/
  async function peopleCounter(username) {
    usernameTrimmed = username.trim().toLowerCase();
    if (lettersOnlyRegex.test(usernameTrimmed)) {
      // give us actual name in an object for existing users
      //  or null, if its a new user.
      let namecheck = await db.oneOrNone(
        "select user_name from users_schema.users where user_name = $1",
        [usernameTrimmed]
      );
      // check if person was greeted before, then add person to the database
      // else update the counter for the existing user.
      if (namecheck === null) {
        // if its a new user insert them to the table,
        // and set their appearance to 1.
        await db.none(
          "insert into users_schema.users (user_name, user_counter) values ($1, $2)",
          [usernameTrimmed, 1]
        );
      } else {
        // if its a existing user don't insert them
        // to the table, and increment appearance by 1.
        await db.none(
          "update users_schema.users set user_counter = user_counter + 1 where user_name = $1",
          [usernameTrimmed]
        );
      }
    }
  }
  async function peopleGreeted() {
    // accumulate how many usernames are in the users table
    let counter = await db.oneOrNone(
      "select count(user_name) from users_schema.users"
    );
    // use this total as the overall greet counter.
    greetCounter = counter.count;
    return greetCounter;
  }
  async function getGreetedUsers() {
    users = await db.many("select user_name from users_schema.users");
    return users;
  }
  async function getNamesCountMap(currentUser) {
    // send a query that uses a dynamic username,
    // to get data about how many times that specific
    // user was greeted.
    const query =
      "select user_counter from users_schema.users where user_name = $1";
    const userData = await db.oneOrNone(query, [currentUser]);
    return userData;
  }
  /* --------------------------- MY ASYNC FUNCTIONS  ---------------------------*/
  function greetUserWithLanguage(language, username) {
    if (username !== undefined) {
      usernameTrimmed = username.trim();
      if (lettersOnlyRegex.test(usernameTrimmed)) {
        let arrName = usernameTrimmed.toLowerCase().split("");
        [firstLetter, ...restOfLetters] = arrName;
        let capitalizeName = firstLetter.toUpperCase() + restOfLetters.join("");
        if (language === "isiZulu") {
          greetMsg = `Sawubona ${capitalizeName}`;
        } else if (language === "English") {
          greetMsg = `Hello ${capitalizeName}`;
        } else if (language === "isiXhosa") {
          greetMsg = `Molo ${capitalizeName}`;
        }
      } else {
        return "";
      }
    }
  }

  function userGreetedIn() {
    return greetMsg;
  }

  function displayErrorMsg(username, language) {
    if (username !== undefined) {
      username === "" ? (errorMsg = "Please enter your name") : "";

      language === undefined ? (errorMsg = "Please select a language") : "";

      username === "" && language === undefined
        ? (errorMsg = "Please select a language and enter your name")
        : "";

      username !== "" && language !== undefined ? (errorMsg = "") : "";

      username !== "" &&
      language !== undefined &&
      !lettersOnlyRegex.test(usernameTrimmed)
        ? (errorMsg = "Name should only contain letters")
        : "";
    }
  }
  function currentErrorMsg() {
    return errorMsg;
  }
  // function nameWithNumberError(username) {
  //   usernameTrimmed = username.trim();
  //   if (!lettersOnlyRegex.test(usernameTrimmed)) {
  //     errorMsg = "Name should only contain letters";
  //     return errorMsg;
  //   }
  // }
  async function resetCounter() {
    return await db.any(
      "TRUNCATE TABLE users_schema.users RESTART IDENTITY CASCADE"
    );
  }

  return {
    peopleCounter,
    peopleGreeted,
    greetUserWithLanguage,
    displayErrorMsg,
    resetCounter,
    // nameWithNumberError,
    userGreetedIn,
    currentErrorMsg,
    getGreetedUsers,
    getNamesCountMap,
  };
}
