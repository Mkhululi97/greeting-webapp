export default function Greet() {
  let usernameTrimmed = "";
  let greetMsg = "";
  let errorMsg = "";
  let firstLetter, restOfLetters;
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
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

      errorMsg !== "" ? (greetMsg = "") : "";
    }
  }
  function currentErrorMsg() {
    return errorMsg;
  }
  function resetMessages() {
    greetMsg = "";
    errorMsg = "";
  }
  let success;
  function clearDbMsg() {
    success = "Database data has been reset.";
    return success;
  }
  return {
    greetUserWithLanguage,
    displayErrorMsg,
    userGreetedIn,
    currentErrorMsg,
    resetMessages,
    clearDbMsg,
  };
}
