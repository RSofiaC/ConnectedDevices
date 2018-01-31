var express = require ('express');
var bodyParser = require ('body-parser');
var path = require('path');

var app = express();//what does this function mean
/*var logger = function(req, res, next){//this is a costum middlewear and its order is important has to be before get
  console.log('logging...');
  next();
}

app.use(logger);//this is how you actually use the previous middlewear without this line nothing happens
*/

//View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Body parser middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path, meaning the place where css and all the stuff that needs to be shown will go
app.use(express.static(path.join(__dirname, 'public')));

/*var person = {
  name:'Juan',
  age: 40
}*/

/*var people = [
  {
    name:'Fede',
    age:24
  },
  {
    name:'Akon',
    age:78
  },
  {
    name:'Juju',
    age:98
  }
]*/

var users = [
  {
    id:1,
    first_name: 'Juan',
    last_name: 'Hu',
    email: 'jijo@yuyu.co',
  },
  {
    id:2,
    first_name: 'Jill',
    last_name: 'Mu',
    email: 'jUjo@yuyu.co',
  },
  {
    id:3,
    first_name: 'Kio',
    last_name: 'Loi',
    email: 'LuLo@yuyu.co',
  }
]

app.get('/',function(req, res){//This is a get request
    //res.send('Dónde esta mi gente');//semd method prints whatever you put here into your route
    //res.json(people); // parses json files
    res.render('index',{
      title: 'Costumer',
      users : users
    });//renders EJS content (need to understand what EJS is)
});

app.post('/users/add', function(req, res){
  //console.log(req.body.first_name);//getting the values from the form into the console
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  console.log(newUser);
});

app.listen(3000, function(){//the app needs to listen to a port in order to be served
  console.log('Server Started on port 3000');
})
