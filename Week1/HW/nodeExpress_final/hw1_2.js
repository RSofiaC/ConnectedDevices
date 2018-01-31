var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.errors = null
  next();
});

//Error formating
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam+='['+namespace.shift()+']';
    }
    // Build your resulting errors however you want! String, object, whatever - it works!
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

var users = [
//   {
//   id:1,
//   first_name: 'Jhon',
//   last_name: 'Doe',
//   email: 'juju'
// },
//   {
//   id:2,
//   first_name: 'Sam',
//   last_name: 'Luis',
//   email: 'juju'
// },
//   {
//   id:3,
//   first_name: 'Uva',
//   last_name: 'Doe',
//   email: 'juju'
//   }
]

app.get('/', function(req, res){
  res.render('index',{
    //title:'Costumers',
    users: users
  });
});

app.post('/users/add',function(req,res){
  req.checkBody('first_name', 'First name is needed').notEmpty();
  req.checkBody('last_name', 'Gimmie').notEmpty();
  req.checkBody('email', 'Your info').notEmpty();

  var errors = req.validationErrors();

  if (errors){
    res.render('index',{
      title:'Costumers',
      users: users,
      errors: errors
    });
  }else{
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
    console.log('YEEEEEI');
  }
  });



app.listen(3000,function(){
  console.log('server Started on Port 3000...');
})
