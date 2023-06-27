const info = {
    name: "lau",
    friend: { name: "twig"}
}

const obj = { ...info }
obj.friend.name = "lilan"
console.log(obj, info)