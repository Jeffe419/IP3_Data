var express = require('express');
var app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));

//Serves all the request which includes /Css in the url from Css folder
app.use('/css', express.static(__dirname + '/Css'));

//Serves all the request which includes /scripts in the url from  scripts
app.use('/scripts', express.static(__dirname + '/Scripts'));

//Serves all the request which includes /datadb in the url from DataDb
app.use('/datadb', express.static(__dirname + '/DataDb'));


var server = app.listen(5000);
console.log('Server started at http://localhost:' + port);