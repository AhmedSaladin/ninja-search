const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

//using bodyparser
app.use(bodyParser.json());

//initialize routes
//using routes model in app.js ((/api)is added before any routes)
app.use('/api',routes);

//error handling middleware
app.use(function(err,req,res,next){
  //  console.log(err);
  res.status(422).send({error:err.message})
  
});

//listen for requests

app.listen(process.env.port || 4000, function () {

    console.log('now listening for requsets ');
})

