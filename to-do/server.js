var http = require('http');
var express =require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');





//for c9
var db;
var db_url = "mongodb://"+process.env.IP+":27017"

/* CW 9b*/
var mongoose = require("mongoose");

mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to mongodb');
})

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  review-name: {
    type: String,
    required: "review name required"
  },
  priority: {
    type: Number,
     required: "review priority required"
  },
  notes: {
    type: String,
     required: "review notes required"
  }
});

var review = mongoose.model('Review', reviewSchema)



app.use('/static', express.static('public'));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
  response.sendFile(__dirname+'/index.html');
});

app.get('/about-page', function(request, response){
  response.sendFile(__dirname+'/about.html');
});

app.get('/new-review', function(request, response){
  response.sendFile(__dirname+'/form.html');
});

var review = [];

app.post('/review/create', function(request, response){
  
  var new_review = new Review(request.body);
  
            new_review.save(function(err, data){
    if(err)
      
      return response.status(400)
                    .json({error: "Please input the required fields!"});
              
              
    console.log(data);
              
              
    return response.status(200)
                    .json({message: "review successfully created"});

  })

  
  console.log(request.body);
  
});




app.get('/review/', function(request, response){
  
  response.render('../list.ejs', {
    review:review
  })
});


article.push({review-name:"Test review 1", priority:2, notes:"review 1!!!"});

article.push({review-name:"Test review 2", priority:9, notes:"review 2"});

app.get('/review/:reviewID', function(request, response){
  
  response.render('../review.ejs', {
    
    review:review[request.params.reviewID]
  })
});

server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
  console.log('Server running');
});
