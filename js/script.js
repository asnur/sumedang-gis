mapboxgl.accessToken =
  "pk.eyJ1IjoicGVyYXJlIiwiYSI6ImNrbWQzcGc1cjJodTEybnAxYXR4NXkwdGIifQ.OZdSBzbYLGl-5upcKpb1dA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/perare/ckpntmyyg0tez17o6yzz9b0om",
  center: [107.9069417, -6.8122635],
  zoom: 15,
  // worldCopyJump: true,
});
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
  },
});

map.on("load", () => {
  // Layer Wilayah
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
      visibility: "none",
    },
  });

  //Layer Persil
  map.addSource("persil", {
    type: "vector",
    url: "mapbox://perare.plot",
  }),
    map.addLayer({
      id: "persil-border",
      type: "line",
      source: "persil",
      "source-layer": "test",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 1,
        "line-opacity": 1,
        "line-color": [
          "match",
          ["get", "ot"],
          0,
          "#8D99A7",
          1,
          "#FFCA00",
          2,
          "#12A4ED",
          3,
          "#7ED320",
          4,
          "#FF8500",
          5,
          "#7854F6",
          6,
          "#58C0F3",
          7,
          "#F5325C",
          "#ccc",
        ],
      },
      layout: {
        visibility: "none",
      },
    }),
    map.addLayer({
      id: "persil-fill",
      type: "fill",
      source: "persil",
      "source-layer": "test",
      paint: {
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], !1],
          1,
          0.5,
        ],
        "fill-color": [
          "match",
          ["get", "ot"],
          0,
          "#8D99A7",
          1,
          "#FFCA00",
          2,
          "#12A4ED",
          3,
          "#7ED320",
          4,
          "#FF8500",
          5,
          "#7854F6",
          6,
          "#58C0F3",
          7,
          "#F5325C",
          "#ccc",
        ],
      },
      layout: {
        visibility: "none",
      },
    });

  //Layer Zonasi
  map.addSource("zonasi", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/zonasi",
  });

  map.addLayer({
    id: "zonasi_fill",
    type: "fill",
    source: "zonasi",
    paint: {
      "fill-color": ["get", "fill"],
      "fill-opacity": 1,
    },
    layout: {
      visibility: "none",
    },
  });
});

const showLayer = (layer) => {
  map.setLayoutProperty(layer, "visibility", "visible");
};

const hideLayer = (layer) => {
  map.setLayoutProperty(layer, "visibility", "none");
};

const onOffLayer = () => {
  $("#wilayah_fill").change(() => {
    if ($("#wilayah_fill").is(":checked")) {
      showLayer("wilayah_fill");
    } else {
      hideLayer("wilayah_fill");
    }
  });
  $("#persil_fill").change(() => {
    if ($("#persil_fill").is(":checked")) {
      showLayer("persil-fill");
      showLayer("persil-border");
    } else {
      hideLayer("persil-fill");
      hideLayer("persil-border");
    }
  });
  $("#zonasi_fill").change(() => {
    if ($("#zonasi_fill").is(":checked")) {
      showLayer("zonasi_fill");
    } else {
      hideLayer("zonasi_fill");
    }
  });
};

onOffLayer();

map.addControl(new mapboxgl.NavigationControl());

map.addControl(draw);

map.on("mouseenter", "polygons-fill", (e) => {
  // console.log(e);
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "polygons-fill", (e) => {
  // console.log(e);
  map.getCanvas().style.cursor = "";
});
map.on("click", "polygons-fill", (e) => {
  console.log(e.features[0].properties);
});

$(".mapboxgl-ctrl.mapboxgl-ctrl-attrib, a.mapboxgl-ctrl-logo").css(
  "visibility",
  "hidden"
);
