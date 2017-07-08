// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




var lions = [];
var id = 0;

app.get("/lions", function(req, res){
	res.status(200);
    res.json(lions);

});

app.get("/lions/:id", function(req, res){
	var params = req.params;
	var id = params.id;
	res.status(200)
	res.json(lions[id]);
	
});

app.post("/lions", function(req, res){
	var newLion = req.body;
	lions.push(newLion);
	res.status(201);
	res.json(newLion);
	

});

app.put("lions/:id", function(req, res){
    var update = req.body
    if (update.id){
    	delete update.id
    }

    var lionIndex = _.findIndex(lions, {id: req.params.id});
    if (!lions[lionIndex]){//If we can't find the lion ...
    	res.send()
    }else{
    	//Merging the objects the update and lions[lionIndex] and return lions[lionIndex]
    	var updatedLion = _.assign(lions[lionIndex], update);
    	res.json();
    }

});

app.delete("lions/:id", function(req, res){
   var lionIndex = _.findIndex(lions, {id: req.params.id});
   if (!lions[lionIndex]){//If we cannot find the lion 
   	res.send();
   }else{
   	var deletedLion = lions[lionIndex];
   	lions.splice(lionIndex, 1);
   	res.json(deletedLion);
   }


});

// TODO: make the REST routes to perform CRUD on lions

app.listen(3000);
console.log('on port 3000');
