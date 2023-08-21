/* ##### GET P ELEMENT THAT DISPLAYS ERROR TEXTS ##### */
let errorTextEle = document.querySelector(".error-text");
/* ##### GET P ELEMENT THAT DISPLAYS WHEN DATABASE IS CLEARED ##### */
let clearDbTextEle = document.querySelector(".db-text");
/* ##### GET P ELEMENT THAT DISPLAYS GREETINGS TEXTS ##### */
let greetTextEle = document.querySelector(".output-str");
/* CLEAR ALL OUT MESSAGES AFTER BEING DISPLAYED */
setTimeout(function () {
  errorTextEle.innerHTML !== "" ? (errorTextEle.innerHTML = "") : "";
  clearDbTextEle.innerHTML !== "" ? (clearDbTextEle.innerHTML = "") : "";
  greetTextEle.innerHTML !== "" ? (greetTextEle.innerHTML = "") : "";
}, 2500);
