var slider = document.getElementById("slider");
var color = "";


//map api

const mapToken =
"pk.eyJ1IjoiamFzb25zYW5kYmVyZyIsImEiOiJja3p5NnM0ZXMwMmRhMm9tbHYyaHg0c2xuIn0.SPy4_h28bli4QOBNfJWryw";
const map = L.map('map').setView([55.860916, -4.251433],3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapToken
}).addTo(map);

var markergroup = L.layerGroup().addTo(map);

function livedata(){
    
    
    
    markergroup.clearLayers(); 
    
for(var i=0;i<=34;i++){
    var location;
    if(i===0){location = "jakarta";  }
    if(i===1){location = "Glasgow";}
    if(i===2){location = "london"; }
    if(i===3){location = "paris";  }
    if(i===4){location = "tokyo";  }
    if(i===5){location = "delhi";  }
    if(i===6){location = "shanghai";  }
    if(i===7){location = "-23.5558,-46.6396";  }
    if(i===8){location = "19.4326,-99.1332";  }
    if(i===9){location = "mumbai";  }
    if(i===10){location = "cairo";  }
    if(i===11){location = "beijing";  }
    if(i===12){location = "dhaka";  }
    if(i===13){location = "osaka";  }
    if(i===14){location = "40.07,-74.0";  }
    if(i===15){location = "karachi";  }
    if(i===16){location = "-34.603722,-58.381592";  }
    if(i===17){location = "chongqing";  }
    if(i===18){location = "istanbul";  }
    if(i===19){location = "calcutta";  }
    if(i===20){location = "manila";  }
    if(i===21){location = "lagos";  }
    if(i===22){location = "rio";  }
    if(i===23){location = "oslo";  }
    if(i===24){location = "kinshasa";  }
    if(i===25){location = "guangzhou";  }
    if(i===26){location = "la";  }
    if(i===27){location = "moscow";  }
    if(i===28){location = "shenzhen";  }
    if(i===29){location = "lahore";  }
    if(i===30){location = "bogota";  }
    if(i===31){location = "juneau";  }
    if(i===32){location = "nuuk";  }
    if(i===33){location = "norilsk";  }
    if(i===34){location = "melbourne";  }
    
    
    
    
    const request = new XMLHttpRequest();
request.open("GET",
"http://api.weatherapi.com/v1/current.json?key=5fcff2cd824f47eeb22165733222102&q="+location+"&aqi=no");
request.send();
request.onload = () => {
  if (request.status === 200){
      var locationdata = JSON.parse(request.response);     
      var locationC = locationdata.current.temp_c;
      locationC = Math.trunc(locationC);
      var latitude = locationdata.location.lat;
      var longitude = locationdata.location.lon;
        if(parseInt(locationC) <= 5){color = "dodgerblue"}
        if(parseInt(locationC) <= 15 && parseInt(locationC) > 5){color = "forestgreen"}
        if(parseInt(locationC) <= 25 && parseInt(locationC) > 15){color = "yellow"}
        if(parseInt(locationC) <= 35 && parseInt(locationC) > 25){color = "orange"}
        if(parseInt(locationC) > 35){color = "red"}
      var locationMarker = new L.Marker([latitude, longitude], {
                    icon: new L.DivIcon({
                        className: "",
                    html: '<div style="padding-right: 1rem;padding-left: 0.3rem;padding-top: 0.1rem;font-weight: bold;font-size: 0.8rem;border-radius: 0.3rem; background-color:'+color+';">'+locationC+'</div>'
                    

                        })
                    }).addTo(markergroup); 
  }
  else {
      console.log("Error:"+ request.status);
  }
};
    
    
    
 
}

}




function sliderchange(){
    
    
    
    if(slider.value === "30"){document.getElementById("slidervalue").innerHTML = "Live &#128308";}
    if(slider.value === "29"){document.getElementById("slidervalue").innerHTML = "2021";}
    if(slider.value === "28"){document.getElementById("slidervalue").innerHTML = "2020";}
    if(slider.value === "27"){document.getElementById("slidervalue").innerHTML = "2019";}
    if(slider.value === "26"){document.getElementById("slidervalue").innerHTML = "2018";}
    if(slider.value === "25"){document.getElementById("slidervalue").innerHTML = "2017";}
    if(slider.value === "24"){document.getElementById("slidervalue").innerHTML = "2016";}
    if(slider.value === "23"){document.getElementById("slidervalue").innerHTML = "2015";}
    if(slider.value === "22"){document.getElementById("slidervalue").innerHTML = "2014";}
    if(slider.value === "21"){document.getElementById("slidervalue").innerHTML = "2013";}
    if(slider.value === "20"){document.getElementById("slidervalue").innerHTML = "2012";}
    if(slider.value === "19"){document.getElementById("slidervalue").innerHTML = "2011";}
    if(slider.value === "18"){document.getElementById("slidervalue").innerHTML = "2010";}
    if(slider.value === "17"){document.getElementById("slidervalue").innerHTML = "2009";}
    if(slider.value === "16"){document.getElementById("slidervalue").innerHTML = "2008";}
    if(slider.value === "15"){document.getElementById("slidervalue").innerHTML = "2007";}
    if(slider.value === "14"){document.getElementById("slidervalue").innerHTML = "2006";}
    if(slider.value === "13"){document.getElementById("slidervalue").innerHTML = "2005";}
    if(slider.value === "12"){document.getElementById("slidervalue").innerHTML = "2004";}
    if(slider.value === "11"){document.getElementById("slidervalue").innerHTML = "2003";}
    if(slider.value === "10"){document.getElementById("slidervalue").innerHTML = "2002";}
    if(slider.value === "9"){document.getElementById("slidervalue").innerHTML = "2001";}
    if(slider.value === "8"){document.getElementById("slidervalue").innerHTML = "2000";}
    if(slider.value === "7"){document.getElementById("slidervalue").innerHTML = "1999";}
    if(slider.value === "6"){document.getElementById("slidervalue").innerHTML = "1998";}
    if(slider.value === "5"){document.getElementById("slidervalue").innerHTML = "1997";}
    if(slider.value === "4"){document.getElementById("slidervalue").innerHTML = "1996";}
    if(slider.value === "3"){document.getElementById("slidervalue").innerHTML = "1995";}
    if(slider.value === "2"){document.getElementById("slidervalue").innerHTML = "1994";}
    if(slider.value === "1"){document.getElementById("slidervalue").innerHTML = "1993";}
    
    
    
    
}


function datachange(){
    var date;
    var location;
    var i;
    
  
        markergroup.clearLayers(); 
        
        
    if(slider.value === "30"){livedata();}
    if(slider.value === "29"){date = "2021-04-15";}
    if(slider.value === "28"){date = "2020-04-15";}
    if(slider.value === "27"){date = "2019-04-15";}
    if(slider.value === "26"){date = "2018-04-15";}
    if(slider.value === "25"){date = "2017-04-15";}
    if(slider.value === "24"){date = "2016-04-15";}
    if(slider.value === "23"){date = "2015-04-15";}
    if(slider.value === "22"){date = "2014-04-15";}
    if(slider.value === "21"){date = "2013-04-15";}
    if(slider.value === "20"){date = "2012-04-15";}
    if(slider.value === "19"){date = "2011-04-15";}
    if(slider.value === "18"){date = "2010-04-15";}
    if(slider.value === "17"){date = "2009-04-15";}
    if(slider.value === "16"){date = "2008-04-15";}
    if(slider.value === "15"){date = "2007-04-15";}
    if(slider.value === "14"){date = "2006-04-15";}
    if(slider.value === "13"){date = "2005-04-15";}
    if(slider.value === "12"){date = "2004-04-15";}
    if(slider.value === "11"){date = "2003-04-15";}
    if(slider.value === "10"){date = "2002-04-15";}
    if(slider.value === "9"){date = "2001-04-15";}
    if(slider.value === "8"){date = "2000-04-15";}
    if(slider.value === "7"){date = "1999-04-15";}
    if(slider.value === "6"){date = "1998-04-15";}
    if(slider.value === "5"){date = "1997-04-15";}
    if(slider.value === "4"){date = "1996-04-15";}
    if(slider.value === "3"){date = "1995-04-15";}
    if(slider.value === "2"){date = "1994-04-15";}
    if(slider.value === "1"){date = "1993-04-15";}
    
    for(i=0;i<=34;i++){
    
    if(i===0){location = "jakarta";  }
    if(i===1){location = "Glasgow";}
    if(i===2){location = "london"; }
    if(i===3){location = "paris";  }
    if(i===4){location = "tokyo";  }
    if(i===5){location = "delhi";  }
    if(i===6){location = "shanghai";  }
    if(i===7){location = "saopaulo";  }
    if(i===8){location = "mexicocity";  }
    if(i===9){location = "mumbai";  }
    if(i===10){location = "cairo";  }
    if(i===11){location = "beijing";  }
    if(i===12){location = "dhaka";  }
    if(i===13){location = "osaka";  }
    if(i===14){location = "newyorkcity";  }
    if(i===15){location = "karachi";  }
    if(i===16){location = "buenosaires";  }
    if(i===17){location = "chongqing";  }
    if(i===18){location = "istanbul";  }
    if(i===19){location = "calcutta";  }
    if(i===20){location = "manila";  }
    if(i===21){location = "lagos";  }
    if(i===22){location = "riodejaneiro";  }
    if(i===23){location = "oslo";  }
    if(i===24){location = "kinshasa";  }
    if(i===25){location = "guangzhou";  }
    if(i===26){location = "la";  }
    if(i===27){location = "moscow";  }
    if(i===28){location = "shenzhen";  }
    if(i===29){location = "lahore";  }
    if(i===30){location = "bogota";  }
    if(i===31){location = "juneau";  }
    if(i===32){location = "nuuk";  }
    if(i===33){location = "norilsk";  }
    if(i===34){location = "melbourne";  }
    
    
    
    const request1 = new XMLHttpRequest();
    request1.open("GET",
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"/"+date+"/"+date+"?unitGroup=metric&include=days&key=XBEQPS777E5SB46N7W9BQJ6MJ&contentType=json");      
        request1.send();
    request1.onload = () => {
  if (request1.status === 200){
      var historicdata = JSON.parse(request1.response);      
      var locationmaxC = historicdata.days[0].tempmax;
      locationmaxC = Math.trunc(locationmaxC);
      var latitude = historicdata.latitude;
      var longitude = historicdata.longitude;
      if(parseInt(locationmaxC) <= 5){color = "dodgerblue"}
        if(parseInt(locationmaxC) <= 15 && parseInt(locationmaxC) > 5){color = "forestgreen"}
        if(parseInt(locationmaxC) <= 25 && parseInt(locationmaxC) > 15){color = "yellow"}
        if(parseInt(locationmaxC) <= 35 && parseInt(locationmaxC) > 25){color = "orange"}
        if(parseInt(locationmaxC) > 35){color = "red"}
      var locationMarker = new L.Marker([latitude, longitude], {
                    icon: new L.DivIcon({
                    className: '',
                    html: '<div style="padding-right: 1rem;padding-left: 0.3rem;padding-top: 0.1rem;font-weight: bold;font-size: 0.8rem;border-radius: 0.3rem; background-color:'+color+';">'+locationmaxC+'</div>'

                        })
                    }).addTo(markergroup);  
  }
  else {
      console.log("Error:"+ request1.status);
  }
};

    
    
    
    }
}

