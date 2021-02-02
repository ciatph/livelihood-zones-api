let province
let output
let button
let download
let query
let map
let mapLayer
let geojsonLayer
const apiUrl = `${window.document.location.origin}/api/province`

function init() {
  province = document.getElementById('province')
  output = document.getElementById('output')
  button = document.getElementById('click')
  query = document.getElementById('query')
  download = document.getElementById('download')

  // Add DOM event listeners
  province.addEventListener('click', function(e) {
    output.innerText = ''
  })

  province.addEventListener('keyup', function(e) {
    query.innerText = `${apiUrl}?name=${province.value}`

    const dl = document.getElementById('download')
    if (dl.checked) {
      query.innerText += '&download=true'
    }
  })

  download.addEventListener('click', function(e) {
    const checked = (e.target.checked) ? `&file=${e.target.checked}` : ''
    query.innerText = `${apiUrl}?name=${province.value}${checked}`
  })

  setTimeout(() => {
    // Initialize map
    map = L.map('map').setView([12.419614853889797, 120.77551644707285], 6)
    mapLayer = new L.LayerGroup()
    mapLayer.addTo(map)

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2lhdHBoIiwiYSI6ImNqNXcyeTNhcTA5MzEycHFpdG90enFxMG8ifQ.gwZ6uo6pvx4-RZ1lHODcBQ'
    }).addTo(map)
  }, 1000)
}

function get() {  
  output.innerText = 'loading...'
  download = document.getElementById('download')

  if (geojsonLayer) {
    mapLayer.removeLayer(geojsonLayer)
  }
  
  if (download.checked) {
    // File download
    axios.get(`${window.document.location.origin}/api/province`, {
      params: { name: province.value, file: true },
      responseType: 'blob'
    }).then(({ data }) => {
      const downloadURL = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = downloadURL
      link.setAttribute('download', 'livelihood_zone.json')
      document.body.appendChild(link)
      link.click()
      link.remove()
      output.innerText = 'finished file download.'
    }).catch(err => {
      output.innerText = err.message
    })
  } else {
    // Display GeoJSON
    axios.get(`${window.document.location.origin}/api/province`, {
      params: { name: province.value }
    }).then(response => {
      output.innerText = JSON.stringify(response.data)
      geojsonLayer = L.geoJSON(response.data, {
        onEachFeature: function (feature, layer) {
          let text = ''
          for (let key in feature.properties) {
            text += `${key}: ${feature.properties[key]}<br>`
          }

          layer.bindPopup(text)
        }
      })
      mapLayer.addLayer(geojsonLayer)
    }).catch(err => {
      console.log(`---responseText`)
      console.log(err.request)
      console.log(`---err.message`)
      console.log(err.message)
      output.innerText = (err.request.responseText) 
        ? JSON.parse(err.request.responseText).message
        : err.message
    })
  }
}
