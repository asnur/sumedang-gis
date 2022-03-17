mapboxgl.accessToken =
  "pk.eyJ1IjoibWVudGhvZWxzciIsImEiOiJja3M0MDZiMHMwZW83MnVwaDZ6Z2NhY2JxIn0.vQFxEZsM7Vvr-PX3FMOGiQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr",
  center: [107.9069417, -6.8122635],
  zoom: 10,
});
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
  },
});

map.on("load", () => {
  map.addSource("wilayah", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/wilayah",
  });

  map.addLayer({
    id: "wilayah_fill",
    type: "fill",
    source: "wilayah",
    paint: {
      "fill-color": "#f1c40f",
      "fill-opacity": 0.7,
      "fill-outline-color": "red",
    },
    layout: {
      visibility: "visible",
    },
  });
});

map.addControl(new mapboxgl.NavigationControl());

map.addControl(draw);

$(".mapboxgl-ctrl.mapboxgl-ctrl-attrib, a.mapboxgl-ctrl-logo").css(
  "visibility",
  "hidden"
);
