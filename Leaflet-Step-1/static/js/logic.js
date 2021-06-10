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

