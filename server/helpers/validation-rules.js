const paths = {
  province: {
    'name': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
  },
  municipality: {
    'municipality': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
    'province': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
  }
}

// Common rules
for (let key in paths) {
  paths[key].file = 'boolean'
}

module.exports = paths
