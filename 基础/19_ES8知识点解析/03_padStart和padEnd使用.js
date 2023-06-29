let message = "Hello World"

const newMsg = message.padStart(15,"#").padEnd(20,"?")

console.log(newMsg)


// 案例
const cardNumber = "410329199834531245"
const lastFourCard = cardNumber.slice(-4)
const finalCard = lastFourCard.padStart(cardNumber.length, "*")
console.log(finalCard)