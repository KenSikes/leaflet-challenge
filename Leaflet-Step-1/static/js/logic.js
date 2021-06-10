//Variable for JSON
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//GET request to query URL 
d3.json(url)
    .then(function (data) {
        createFeatures(data.features);
    });

// Function to determine marker size based on magnitude
function markerSize(circle) {
  return circle * 5;
}

//Function to determine color of marker size based on magnitude
function chooseColor(mag) {
  if (mag > 5) { return "darkred" }
  else if (mag > 4) { return "red" }
  else if (mag > 3) { return "orange" }
  else if (mag > 2) { return "yellow" }
  else if (mag > 1) { return "limegreen" }
  else { return "green" }
}

function createFeatures(earthquakeData) { 
  function onEachFeature(feature, layer) {
      layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location:" + feature.properties.place + "<br>Date:" + new Date(feature.properties.time))
  }

  var earthquakes = L.geoJSON(earthquakeData, {
      //Create circleMarker
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: function (feature) {
          return {
              fillColor: chooseColor(feature.properties.mag),
              fillOpacity: 1,
              weight: 1.5,
              radius: markerSize(feature.properties.mag),
              stroke: false
          }
      },

      onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) { 
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/satellite-streets-v11",
      accessToken: API_KEY
  });
