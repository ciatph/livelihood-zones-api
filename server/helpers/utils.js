// Capitalize the first letters
const capitalize = (string, cb) => {
  return Array.from(string.split(' '),
    x => `${x[0].toUpperCase()}${x.substr(1, x.length)}`).join(' ')
}

module.exports = {
  capitalize
}
