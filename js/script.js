mapboxgl.accessToken =
  "pk.eyJ1IjoicGVyYXJlIiwiYSI6ImNrbWQzcGc1cjJodTEybnAxYXR4NXkwdGIifQ.OZdSBzbYLGl-5upcKpb1dA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/perare/ckpntmyyg0tez17o6yzz9b0om",
  center: [107.9069417, -6.8122635],
  zoom: 10,
});
// const draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//     polygon: true,
//   },
// });
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

const ScrapeData = (uuid, ot) => {
  $.ajax({
    url: `https://my.perare.io/crud/api/plot/by-uuid/${uuid}?expand=ownership_type_id,area,nib,address,listings,photos,uuid,visitsCounter,todayVisitsCounter`,
    type: "GET",
    dataType: "json",
    success: (data) => {
      let coordinate = [data.coordinates];
      $.ajax({
        url: "http://localhost:7000/scrape",
        type: "POST",
        data: {
          uuid: uuid,
          ot: ot,
          coordinates: JSON.stringify({
            type: "MultiPolygon",
            coordinates: coordinate,
          }),
          luas: data.area,
        },
        success: (e) => {
          console.log(e);
        },
      });
    },
  });
};

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

  //Layer Jalan
  map.addSource("jalan", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/jalan",
  });

  map.addLayer({
    id: "jalan_fill",
    type: "line",
    source: "jalan",
    paint: {
      "line-color": "#ff0000",
    },
    layout: {
      visibility: "none",
    },
  });

  //Layer Perairan
  map.addSource("perairan", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/perairan",
  });

  map.addLayer({
    id: "perairan_fill",
    type: "fill",
    source: "perairan",
    paint: {
      "fill-color": "#3498db",
    },
    layout: {
      visibility: "none",
    },
  });

  //Layer Toponomi
  map.addSource("toponomi", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/toponimi",
  });

  map.addLayer({
    id: "toponomi_dot",
    type: "circle",
    source: "toponomi",
    paint: {
      "circle-color": "#e74c3c",
      "circle-stroke-color": "#ffff00",
      "circle-stroke-width": 1,
      "circle-radius": 4,
    },
    layout: {
      visibility: "none",
    },
  });

  //Layer POI
  map.addSource("poi", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/poi",
  });

  map.addLayer({
    id: "poi_dot",
    type: "circle",
    source: "poi",
    paint: {
      "circle-color": "#4264fb",
      "circle-stroke-color": "#ffff00",
      "circle-stroke-width": 1,
      "circle-radius": 4,
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

  //Layer Prediksi
  map.addSource("prediksi", {
    type: "geojson",
    data: "https://jakpintas.dpmptsp-dki.com:7000/prediksi",
  });

  map.addLayer({
    id: "prediksi_fill",
    type: "fill",
    source: "prediksi",
    paint: {
      "fill-color": ["get", "fill"],
      "fill-opacity": 1,
    },
    layout: {
      visibility: "none",
    },
  });
  // setTimeout(() => {
  // });
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
  $("#jalan_fill").change(() => {
    if ($("#jalan_fill").is(":checked")) {
      showLayer("jalan_fill");
    } else {
      hideLayer("jalan_fill");
    }
  });
  $("#perairan_fill").change(() => {
    if ($("#perairan_fill").is(":checked")) {
      showLayer("perairan_fill");
    } else {
      hideLayer("perairan_fill");
    }
  });
  $("#toponomi_dot").change(() => {
    if ($("#toponomi_dot").is(":checked")) {
      showLayer("toponomi_dot");
    } else {
      hideLayer("toponomi_dot");
    }
  });
  $("#poi_dot").change(() => {
    if ($("#poi_dot").is(":checked")) {
      showLayer("poi_dot");
    } else {
      hideLayer("poi_dot");
    }
  });
  $("#prediksi_fill").change(() => {
    if ($("#prediksi_fill").is(":checked")) {
      showLayer("prediksi_fill");
    } else {
      hideLayer("prediksi_fill");
    }
  });
};

map.on("mouseenter", "toponomi_dot", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  let html = `
    <div class="card">
      <div class="card-body">
        <div style="line-height: 1.2;">
          <span class="d-block"><b>Jenis</b> : ${e.features[0].properties.Jenis}</span>
          <span class="d-block"><b>Toponimi</b> : ${e.features[0].properties.Toponimi}</span>
        </div>
        </div>
    </div>
  `;
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  popup.setLngLat(coordinates).setHTML(html).addTo(map);
});

map.on("mouseleave", "toponomi_dot", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

map.on("mouseenter", "poi_dot", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  let html = `
    <div class="card">
      <div class="card-body">
        <div style="line-height: 1.2;">
        <span class="d-block">${e.features[0].properties.Jenis}</span>
          <span class="d-block">${e.features[0].properties.Nama}</span>
        </div>
        </div>
    </div>
  `;
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  popup.setLngLat(coordinates).setHTML(html).addTo(map);
});

map.on("mouseleave", "poi_dot", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

onOffLayer();

map.addControl(new mapboxgl.NavigationControl());

// map.addControl(draw);

// map.on("dragend", function (e) {
//   if (map.getSource("persil") && map.isSourceLoaded("persil")) {
//     var features = map.querySourceFeatures("persil", {
//       sourceLayer: "test",
//     });
//     features.forEach((data) => {
//       // ScrapeData(data.properties.uuid, data.properties.ot);
//       console.log("Proses");
//     });
//   }
// });

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

// ScrapeData("616bc605-062f-5fba-99a1-f1514760d2d7", "1");
