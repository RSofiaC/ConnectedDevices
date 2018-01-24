var express = require ('express'); //include express library
var server = express(); //create a server using express
app.use('/',express.static('public')); //serve static files from /public also as any other file that is not changing
server.listen(8080); //start the server

function getDate(request, response){
console.log(request.rawHeaders);
response.end('GO AWAY');
}

server.get("/date", getDate);
