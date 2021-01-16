const paths = {
  province: {
    'name': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
    'download': 'boolean'
  },
  municipality: {
    'name': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
    'province': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
  }
}

module.exports = paths
