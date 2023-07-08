define(function() {
  const name = "lau";
  const age = 18;
  const sayHello = function(name) {
    console.log("你好, " + name);
  }

  return {
    name: name,
    age: age,
    sayHello
  }
});