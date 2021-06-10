//Variable for JSON
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//GET request to query URL 
d3.json(url)
    .then(function (data) {
        createFeatures(data.features);
    });

// Function to determine marker size based on magnitude.  
function markerSize(circle) {
  return circle * 5;
}

