// export default function Greet() {
//   let name;
//   let msg;
//   let greetedUserArr = [];
//   let namesCountMap = {};
//   function setName(userName) {
//     name = userName;
//   }
//   function getName() {
//     if (name !== undefined) {
//       if (!greetedUserArr.includes(name) && name !== "") {
//         msg = `Hello, ${name}`;
//         greetedUserArr.push(name);
//       }
//       if (namesCountMap[name] === undefined) {
//         namesCountMap[name] = 1;
//       } else {
//         namesCountMap[name]++;
//       }
//     }
//     return msg;
//   }
//   function getGreetedUsers() {
//     return greetedUserArr;
//   }
//   function getNamesCountMap() {
//     return namesCountMap;
//   }
//   return {
//     setName,
//     getName,
//     getGreetedUsers,
//     getNamesCountMap,
//   };
// }

export default function Greet() {
  let greetCounter = 0;
  let users = [];
  let usernameTrimmed = "";
  let greetMsg = "";
  let errorMsg = "";
  let firstLetter, restOfLetters;
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
  const namesCountMap = {};

  function peopleCounter(username) {
    usernameTrimmed = username.trim();
    if (lettersOnlyRegex.test(usernameTrimmed)) {
      if (!users.includes(usernameTrimmed.toLowerCase())) {
        greetCounter++;
        users.push(usernameTrimmed.toLowerCase());
      }
    }
  }
  function peopleGreeted() {
    return greetCounter;
  }
  function getGreetedUsers() {
    return users;
  }
  function greetUserWithLanguage(language, username) {
    if (username !== undefined) {
      usernameTrimmed = username.trim();
      if (lettersOnlyRegex.test(usernameTrimmed)) {
        let arrName = usernameTrimmed.toLowerCase().split("");
        [firstLetter, ...restOfLetters] = arrName;
        let capitalizeName = firstLetter.toUpperCase() + restOfLetters.join("");
        if (namesCountMap[username] === undefined) {
          namesCountMap[username] = 1;
        } else {
          namesCountMap[username]++;
        }
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
  function getNamesCountMap() {
    return namesCountMap;
  }
  function displayErrorMsg(username, language) {
    if (username !== undefined) {
      username === "" ? (errorMsg = "Please enter your name") : "";

      language === undefined ? (errorMsg = "Please select a language") : "";

      username === "" && language === undefined
        ? (errorMsg = "Please select a language and enter your name")
        : "";

      username !== "" && language !== undefined ? (errorMsg = "") : "";
    }
  }
  function currentErrorMsg() {
    return errorMsg;
  }
  function nameWithNumberError(username) {
    usernameTrimmed = username.trim();
    if (!lettersOnlyRegex.test(usernameTrimmed)) {
      errorMsg = "Name should only contain letters";
      return errorMsg;
    }
  }
  function resetCounter() {
    greetCounter = 0;
    greetMsg = "";
    errorMsg = "";
    users = [];
  }

  return {
    peopleCounter,
    peopleGreeted,
    greetUserWithLanguage,
    displayErrorMsg,
    resetCounter,
    nameWithNumberError,
    userGreetedIn,
    currentErrorMsg,
    getGreetedUsers,
    getNamesCountMap,
  };
}
