function calculateNewLatitude(latitude,distance){
    const earthRadius = 6371;
    const newLatitude = latitude + (distance / earthRadius) * (180 / Math.PI);
    return newLatitude;
}

function calculateNewLongitude(latitude, longitude, distance) {
    const earthRadius = 6371;
    const newLongitude = longitude + (distance / earthRadius) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);
    return newLongitude;
}

function calculateBoundingBox(latitude, longitude, distance) {
    const newLatitudeNorth = calculateNewLatitude(latitude, distance);
    const newLatitudeSouth = calculateNewLatitude(latitude, -distance);
    const newLongitudeEast = calculateNewLongitude(latitude, longitude, distance);
    const newLongitudeWest = calculateNewLongitude(latitude, longitude, -distance);

    return `${newLatitudeSouth},${newLongitudeWest},${newLatitudeNorth},${newLongitudeEast}`;
}

function makerequest(box){
    const axios = require('axios');

    const overpassQuery = `[out:json];
    node["amenity"!="public_bookcase"][amenity~"bar|pub|biergarten" ]({{bbox}});
    out;`;

    const bbox = '44.80105277144845,-0.6004654909361906,44.81798099700378,-0.5682789827574798'; 



    const apiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery.replace('{{bbox}}', newbox))}`;

    axios.get(apiUrl)
    .then(response => {
        const dataObject = response.data;
        const numberOfElements = dataObject.elements.length;
        console.log(JSON.stringify(dataObject, null, 2));
        console.log('Nombre d\'éléments:', numberOfElements);
    })
    .catch(error => {
        console.error('Error fetching data from Overpass API:', error);
    });

}

function getBars(latitude,longitude,distance){
    var newbox = calculateBoundingBox(latitude,longitude,distance);
    makerequest(newbox);
}

var latitude = 	44.8017853;
var longitude = -0.5880281;
var newbox = calculateBoundingBox(latitude,longitude,2);
console.log(newbox);
makerequest(newbox);

