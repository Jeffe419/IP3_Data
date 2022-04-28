var planeIcon = L.icon({
    iconUrl: "Images/plane.png",
    iconSize: [30, 30]
})
var destinationIcon = L.icon({
    iconUrl: "Images/destination.png",
    iconSize: [30, 30]
})
var initialAirport = document.getElementById("initial_airport");
var arrivalAirport = document.getElementById("arrival_airport");
var distanceTravelled = document.getElementById("distance_travelled");
var co2usage = document.getElementById("co2_usage");

const mapToken =
"pk.eyJ1IjoiamFzb25zYW5kYmVyZyIsImEiOiJja3p5NnM0ZXMwMmRhMm9tbHYyaHg0c2xuIn0.SPy4_h28bli4QOBNfJWryw";
const map = L.map('map2').setView([55.860916, -4.251433],3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapToken
}).addTo(map);


var departureairports = [];
var arrivalairports = [];
var depLats = [];
var depLngs = [];
var arrLats = [];
var arrLngs = [];
var errors = [];
var depcoords = [];
var arrcoords = [];
var coords = [];
var distances = [];

async function getData(){

    let params = new URLSearchParams({
        access_key : "3899fd3653c7fc17393e9a53ab146faf",
        limit : 100
    });

const response = await fetch(`http://api.aviationstack.com/v1/flights?${params}`);

if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

const flightdata = await response.json();

console.log(flightdata);


for(let i = 0; i<50; i++){
    departureairports[i] = flightdata.data[i].departure.airport;
    arrivalairports[i] = flightdata.data[i].arrival.airport;
}


for(let i = 0; i < departureairports.length; i++){
    if(departureairports[i] === null || arrivalairports[i] === null){
        departureairports.splice(i, 1);
        arrivalairports.splice(i, 1);
    }
}




// LATS AND LNGS
for(let i =0; i<departureairports.length;i++){
const response1 = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+departureairports[i]+"&key=AIzaSyAy5sJzX-DATHWo_QQee7O632q-xU6cEWM");
const response2 = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+arrivalairports[i]+"&key=AIzaSyAy5sJzX-DATHWo_QQee7O632q-xU6cEWM");
if (!response1.ok || !response2.ok) {
    const message = `An error has occured: ${response1.status + "AND "+ response2.status}`;
    throw new Error(message);
  }

  const departuresdata = await response1.json();
  const arrivalsdata = await response2.json();

  try{
      
        var departureslat = departuresdata.results[0].geometry.location.lat;
        var departureslng = departuresdata.results[0].geometry.location.lng;
        var arrivalslat = arrivalsdata.results[0].geometry.location.lat;
        var arrivalslng = arrivalsdata.results[0].geometry.location.lng;
      
  } catch{
      console.log("Try catch error");
      errors.push(i);
  }
  

  depLats[i] = departureslat;
  depLngs[i] = departureslng;
  arrLats[i] = arrivalslat;
  arrLngs[i] = arrivalslng;
}





// ERROR REMOVING
var y = 0;
for(let i=0;i<errors.length;i++){
    errors.splice(i, 1, errors[i]+y)
    y=y-1;
}
for(i=0; i<errors.length;i++){
    
    depLats.splice(errors[i], 1);
    depLngs.splice(errors[i], 1);
    arrLats.splice(errors[i], 1);
    arrLngs.splice(errors[i], 1);
    departureairports.splice(errors[i],1);
    arrivalairports.splice(errors[i],1);
    
    
}



console.log(departureairports);
console.log(arrivalairports);
console.log(depLats);
console.log(depLngs);
console.log(arrLats);
console.log(arrLngs);


//COORDINATES
for(i=0; i<depLats.length;i++){
    depcoords[i] = [depLats[i], depLngs[i]];
    arrcoords[i] = [arrLats[i], arrLngs[i]];
}
for(i=0; i<depcoords.length;i++){
    coords[i] = [depcoords[i], arrcoords[i]];
}





// DISTANCE
for(i=0;i<depLats.length;i++){

    const R = 6371e3; // metres
   const latpi1 = depLats[i] * Math.PI/180; 
   const latpi2 = arrLats[i] * Math.PI/180;
   const sublats = (arrLats[i]-depLats[i]) * Math.PI/180;
   const sublngs = (arrLngs[i]-depLngs[i]) * Math.PI/180;
   
   const a = Math.sin(sublats/2) * Math.sin(sublats/2) +
             Math.cos(latpi1) * Math.cos(latpi2) *
             Math.sin(sublngs/2) * Math.sin(sublngs/2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   
   const d = R * c; // in metres
   
   distances[i] = d;
   }
   
   console.log(distances);





   /* average 910 km/h
      average 92 kg of co2 per hour
      so 92/910 = 0.101 kg of co2 per km travelled
      or 0.0001011 kg of co2 per meter
      */


   var co2 = 0.0001011;



// MAP PLOTTING
 for(let i = 0; i<depLats.length;i++){
    var departure = new L.marker([depLats[i], depLngs[i]], {icon: planeIcon});
    map.addLayer(departure);
    departure.on('click', function(e){
                  initialAirport.innerHTML = departureairports[i];
                  arrivalAirport.innerHTML = arrivalairports[i];
                  distanceTravelled.innerHTML = Math.round((distances[i]/1000) * 100) / 100 + " km" ;
                  co2usage.innerHTML = Math.round(distances[i]*co2 *100)/100+ " kg";
                  
    });
    var arrival = new L.marker([arrLats[i], arrLngs[i]], {icon: destinationIcon});
    map.addLayer(arrival);
    arrival.on('click', function(e){
                  initialAirport.innerHTML = departureairports[i];
                  arrivalAirport.innerHTML = arrivalairports[i];
                  distanceTravelled.innerHTML = Math.round((distances[i]/1000) * 100) / 100 + " km" ;
                  co2usage.innerHTML = Math.round(distances[i]*co2 *100)/100+ " kg";
                  
    });


    var line = new L.polyline(coords[i]);
    map.addLayer(line);
    line.on('click', function(e){
        initialAirport.innerHTML = departureairports[i];
        arrivalAirport.innerHTML = arrivalairports[i];
        distanceTravelled.innerHTML = Math.round((distances[i]/1000) * 100) / 100 + " km" ;
        co2usage.innerHTML = Math.round(distances[i]*co2 *100)/100+ " kg";
        
});

 }


console.log(distances[1]);
 



        }

        

