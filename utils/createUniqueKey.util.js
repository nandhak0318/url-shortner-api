const randomKeyGen = async (model) => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let key = ''
  for (let i = 0; i < 7; i++) {
    const temp = Math.floor(Math.random() * 52)
    key = key + letters[temp]
  }
  const isKeyExist = await model.findOne({ key: key })
  if (isKeyExist) {
    key = await randomKeyGen()
  }
  return key
}

const randomUidGen = async (model) => {
  const letters = '0123456789'
  let key = ''
  for (let i = 0; i < 13; i++) {
    const temp = Math.floor(Math.random() * 10)
    key = key + letters[temp]
  }
  const isKeyExist = await model.findOne({ uid: key })
  if (isKeyExist) {
    key = await randomKeyGen()
  }
  return parseInt(key)
}

module.exports = { randomKeyGen, randomUidGen }
