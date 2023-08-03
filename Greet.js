export default function Greet() {
  let name;
  let msg;
  let greetedUserArr = [];
  function setName(userName) {
    name = userName;
  }
  function getName() {
    if (name !== undefined) {
      msg = `Hello, ${name}`;
      if (!greetedUserArr.includes(name) && name !== "")
        greetedUserArr.push(name);
    }
    return msg;
  }
  function getGreetedUsers() {
    return greetedUserArr;
  }
  return {
    setName,
    getName,
    getGreetedUsers,
  };
}
