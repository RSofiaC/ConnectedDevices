var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

var users = [
  {
  id:1,
  first_name: 'Jhon',
  last_name: 'Doe',
  email: 'juju'
},
  {
  id:2,
  first_name: 'Sam',
  last_name: 'Luis',
  email: 'juju'
},
  {
  id:3,
  first_name: 'Uva',
  last_name: 'Doe',
  email: 'juju'
  }
]

app.get('/', function(req, res){
  res.render('index',{
    title:'Costumers',
    users: users
  });
});

app.post('/users/add',function(req,res){
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  console.log(newUser);
});

app.listen(3000,function(){
  console.log('server Started on Port 3000...');
})
