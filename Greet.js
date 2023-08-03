export default function Greet() {
  let name;
  let msg;
  function setName(userName) {
    name = userName;
  }
  function getName() {
    name !== undefined ? (msg = `Hello, ${name}`) : "";
    return msg;
  }
  return {
    setName,
    getName,
  };
}
