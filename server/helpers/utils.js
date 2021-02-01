// Capitalize the first letters
const capitalize = (string, cb) => {
  return Array.from(string.split(' '),
    x => `${x[0].toUpperCase()}${x.substr(1, x.length)}`).join(' ')
}

// Return a JSON file for download
const filedownload = (res, name, data) => {
  const filename = `livelihood-zone-${name.toLowerCase()}.json`
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Content-disposition', 'attachment; filename=' + filename)
  res.end(res.json(data))
}

module.exports = {
  capitalize,
  filedownload
}
