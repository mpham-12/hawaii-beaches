mapboxgl.accessToken = mapboxToken
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: beach.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
});

new mapboxgl.Marker()
.setLngLat(beach.geometry.coordinates)
.addTo(map)