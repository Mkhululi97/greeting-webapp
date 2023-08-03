import assert from "assert";
import Greet from "../Greet.js";
describe("Testing Greet Factory Function", function () {
  it("should return how many user's have been greeted", function () {
    let greet = Greet();
    greet.peopleCounter("Mkhululi");
    greet.peopleCounter("Mkhululi");
    greet.peopleCounter("Thembakazi");
    greet.peopleCounter("Akhona");
    greet.peopleCounter("Mashoto");
    greet.peopleCounter("thembakazi");
    greet.peopleCounter("Londeka");
    greet.peopleCounter("akhona");
    greet.peopleCounter("Mashoto");
    greet.peopleCounter("Londeka");
    greet.peopleCounter("Bheka");
    greet.peopleCounter("bheka");
    assert.equal(6, greet.peopleGreeted());
    greet.peopleCounter("Thando");
    greet.peopleCounter("Mpukeng");
    assert.equal(8, greet.peopleGreeted());
  });
  it("should not count names that have numbers in them", function () {
    let greet = Greet();
    greet.peopleCounter("Thandi");
    greet.peopleCounter("THANDI");
    greet.peopleCounter("mponeng");
    greet.peopleCounter("Thembi34");
    assert.equal(2, greet.peopleGreeted());
    greet.peopleCounter("Mthoko");
    greet.peopleCounter("palesa");
    greet.peopleCounter("MPONENG3");
    greet.peopleCounter("Thembi ");
    assert.equal(5, greet.peopleGreeted());
  });
  it("should greet user in the language they selected", function () {
    let greet = Greet();
    greet.greetUserWithLanguage("isiZulu", "Mkhululi");
    assert.equal("Sawubona Mkhululi", greet.userGreetedIn());
    greet.greetUserWithLanguage("isiZulu", "Londeka");
    assert.equal("Sawubona Londeka", greet.userGreetedIn());
    greet.greetUserWithLanguage("isiZulu", "Mashoto");
    assert.equal("Sawubona Mashoto", greet.userGreetedIn());
    greet.greetUserWithLanguage("isiZulu", "Akhona");
    assert.equal("Sawubona Akhona", greet.userGreetedIn());
    greet.greetUserWithLanguage("English", "Akhona");
    assert.equal("Hello Akhona", greet.userGreetedIn());
    greet.greetUserWithLanguage("isiXhosa", "Mashoto");
    assert.equal("Molo Mashoto", greet.userGreetedIn());
  });
  describe("Shows Error Message", function () {
    it("if the input field is empty", function () {
      let greet = Greet();
      assert.equal(
        "Please enter your name",
        greet.displayErrorMsg("", "isiZulu")
      );
    });
    it("if the radio button is not selected", function () {
      let greet = Greet();
      assert.equal(
        "Please select a language",
        greet.displayErrorMsg("Mkhululi", null)
      );
    });
    it("if the input field and the radio button is not selected", function () {
      let greet = Greet();
      assert.equal(
        "Please select a language and enter your name",
        greet.displayErrorMsg("", null)
      );
    });
    it("if the username includes a number or any special characters", function () {
      let greet = Greet();
      greet.peopleCounter("thami");
      greet.peopleCounter("thami@12");
      greet.peopleCounter("wezi");
      greet.peopleCounter("Wezi_45");
      assert.equal(2, greet.peopleGreeted());
      assert.equal(
        "Name should only contain letters",
        greet.nameWithNumberError("thami123")
      );
    });
  });
  describe("Reset Button", function () {
    it("Should reset the counter to 0", function () {
      let greet = Greet();
      assert.equal(0, greet.resetCounter());
      greet.peopleCounter("Mkhululi");
      greet.peopleCounter("Thembakazi");
      greet.peopleCounter("Akhona");
      assert.equal(3, greet.peopleGreeted());
      greet.peopleCounter("Sakhile");
      greet.peopleCounter("Peter");
      assert.equal(5, greet.peopleGreeted());
      greet.peopleCounter("Londeka");
      greet.peopleCounter("Bheka");
      greet.peopleCounter("Kabelo");
      greet.resetCounter();
      assert.equal(0, greet.peopleGreeted());
    });
  });
});
