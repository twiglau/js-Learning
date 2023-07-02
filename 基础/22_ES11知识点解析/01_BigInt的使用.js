// ES11 之前

// 最大表示Int的数值
const maxInt = Number.MAX_SAFE_INTEGER
console.log(maxInt) // 9007199254740991
console.log(maxInt + 1) // 9007199254740992
console.log(maxInt + 2) // 9007199254740992


// ES11 之后: BigInt
const bigInt = 9007199254740992000n
console.log(bigInt + 10n)

const num = 100
console.log(bigInt + BigInt(num))

const smallNum = Number(bigInt)
console.log(smallNum) // 不安全