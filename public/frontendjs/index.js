/* ##### GET P ELEMENT THAT DISPLAYS ERROR TEXTS ##### */
const errorTextEle = document.querySelector(".error-text");
/* ##### GET P ELEMENT THAT DISPLAYS WHEN DATABASE IS CLEARED ##### */
const clearDbTextEle = document.querySelector(".db-text");
/* ##### GET P ELEMENT THAT DISPLAYS GREETINGS TEXTS ##### */
const greetTextEle = document.querySelector(".output-str");
/* ##### GET P ELEMENT THAT DISPLAYS GREETINGS TEXTS ##### */
const resetBtn = document.querySelector(".reset-btn");
/* CLEAR ALL OUT MESSAGES AFTER BEING DISPLAYED */
setTimeout(function () {
  errorTextEle.innerHTML !== "" ? (errorTextEle.innerHTML = "") : "";
  clearDbTextEle.innerHTML !== "" ? (clearDbTextEle.innerHTML = "") : "";
  greetTextEle.innerHTML !== "" ? (greetTextEle.innerHTML = "") : "";
}, 2500);
resetBtn.addEventListener("click", function (e) {
  const deleteData = window.confirm(
    "Are you sure you want to reset the counter"
  );
  //when true delete the data, when false do not delete data
  deleteData ? "" : e.preventDefault();
});
