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
    if (username === "") {
      errorMsg = "Please enter your name";
    }
    if (language === null) {
      errorMsg = "Please select a language";
    }
    if (username === "" && language === null) {
      errorMsg = "Please select a language and enter your name";
    }
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
    return (greetCounter = 0);
  }

  return {
    peopleCounter,
    peopleGreeted,
    greetUserWithLanguage,
    displayErrorMsg,
    resetCounter,
    nameWithNumberError,
    userGreetedIn,
  };
}
