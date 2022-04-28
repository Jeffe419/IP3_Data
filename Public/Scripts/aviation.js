var planeIcon = L.icon({
    iconUrl: "Images/plane.png",
    iconSize: [30, 30]
})
var destinationIcon = L.icon({
    iconUrl: "Images/destination.png",
    iconSize: [30, 30]
})

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







var departure;
var arrival;
var y = 9;
var depArray = [];
var arrArray = [];
var depLats = [];
var depLngs = [];
var arrLats = [];
var arrLngs = [];
var depcoords = [];
var arrcoords = [];
var initialAirport = document.getElementById("initial_airport");
var arrivalAirport = document.getElementById("arrival_airport");
var distanceTravelled = document.getElementById("distance_travelled");
var co2usage = document.getElementById("co2_usage");



function getAirports(){
    return new Promise(function (resolve, reject){
const request = new XMLHttpRequest();
request.open("GET", "http://api.aviationstack.com/v1/flights?access_key=a094b9c633b2271f2431ca50057e9d14");
request.send();
request.onload = () => {
  if (request.status === 200){

      var flightdata = JSON.parse(request.response);

      console.log(flightdata);
      for(var i = 0; i<= y; i++){

        if (flightdata.data[i].departure.airport == null || flightdata.data[i].arrival.airport == null){
        console.log("airport value is null");
        
        }
        else{
      departure = flightdata.data[i].departure.airport;
      arrival = flightdata.data[i].arrival.airport;
      
      depArray[i] = departure;
      arrArray[i] = arrival;
      }

    };
    resolve();
}
else {
    console.log("Error:"+ request.status);
    reject();
}
}
    });
}








    
        

           async function getCoords(){
            let res = await getAirports();
            console.log(res);
            // DEPARTURE COORDS
            //ARRIVAL COORDS
        for(var i=0;i<= depArray.length-1;i++){
            console.log(i);
              const request1 = new XMLHttpRequest();
              request1.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+depArray[i]+"&key=AIzaSyAy5sJzX-DATHWo_QQee7O632q-xU6cEWM");
              request1.send();
              const request2 = new XMLHttpRequest();
              request2.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+arrArray[i]+"&key=AIzaSyAy5sJzX-DATHWo_QQee7O632q-xU6cEWM");
              request2.send();
              request1.onload = () => {
                  request2.onload = () => {
                    
                if (request1.status === 200 && request2.status === 200){
                    try {

                        
                        var departuredata = JSON.parse(request1.response);
                        var arrivaldata = JSON.parse(request2.response);
                    
                        if(depArray[i] == undefined)
                            {
                                console.log("Null departure")
                                
                        } 
                         if(arrArray[i] == undefined){
                            console.log("Null arrival")
                          //  console.log(arrArray[i]);
                        }
                            else{
                    var departurelat = departuredata.results[0].geometry.location.lat;
                    var departurelng = departuredata.results[0].geometry.location.lng;
                    var arrivallat = arrivaldata.results[0].geometry.location.lat;
                    var arrivallng = arrivaldata.results[0].geometry.location.lng;
                 
                    
                    

                    depLats.push(departurelat);
                    depLngs.push(departurelng);
                    arrLats.push(arrivallat);
                    arrLngs.push(arrivallng);
            
                            }
                    
        
                    }
                    catch (error) {
                        console.log("try catch error");
                    }


                }
                else {
                    console.log("Error:"+ request1.status+ "AND "+request2.status);
                }
              };
            }

        }
    
    } 
       
    
            
            
    
setTimeout(function(){
console.log(depArray)
console.log(arrArray)
console.log(depLats)
console.log(depLngs)
console.log(arrLats)
console.log(arrLngs)

    for(var i=0;i<=depArray.length-1;i++){

     
        
        var departure = new L.marker([depLats[i], depLngs[i]], {icon: planeIcon, title: depArray[i], alt: arrArray[i]});
        map.addLayer(departure);
        departure.on('click', function(e){
                      initialAirport.innerHTML = this.options.title;
                      arrivalAirport.innerHTML = this.options.alt;
                      
        });

        var arrival = new L.marker([arrLats[i], arrLngs[i]], {icon: destinationIcon, title: arrArray[i], alt: depArray[i]})
        map.addLayer(arrival);
        arrival.on('click', function(){
            initialAirport.innerHTML = this.options.title;
            arrivalAirport.innerHTML = this.options.alt;
        });

    }
},6000);





    