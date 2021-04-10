mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: post.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(post.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 10 }).setHTML(
      `<h4>${post.title}</h4><p>${post.location}</p>`
    )
  )
  .addTo(map);
