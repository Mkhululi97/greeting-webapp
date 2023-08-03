export default function Greet() {
  let name;
  let msg;
  let greetedUserArr = [];
  let namesCountMap = {};
  function setName(userName) {
    name = userName;
  }
  function getName() {
    if (name !== undefined) {
      if (!greetedUserArr.includes(name) && name !== "") {
        msg = `Hello, ${name}`;
        greetedUserArr.push(name);
      }
      if (namesCountMap[name] === undefined) {
        namesCountMap[name] = 1;
      } else {
        namesCountMap[name]++;
      }
    }
    return msg;
  }
  function getGreetedUsers() {
    return greetedUserArr;
  }
  function getNamesCountMap() {
    return namesCountMap;
  }
  return {
    setName,
    getName,
    getGreetedUsers,
    getNamesCountMap,
  };
}
