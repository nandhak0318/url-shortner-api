// This funciton going to get time in js time format which we save before the the server and ttl in minutes format
//  time also in minutes
const isExipres = (time, ttl) => {
  console.log(time, ttl)
  let now = Date.now() / 1000 / 60
  now = Math.floor(now)
  let temp = time + ttl
  let diff = temp - now
  diff = Math.floor(diff)
  console.log(diff)
  if (diff > 0) {
    return false
  } else {
    return true
  }
}

// let time = Date.now() / 1000 / 60
// time = time - 101
// isExipres(time, 100)

module.exports = isExipres
