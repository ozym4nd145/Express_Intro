var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


var campSchema = mongoose.Schema({
	name: String,
	src: String,
	desc: String,
});

var Camp = mongoose.model("Camp",campSchema);

//Landing page
app.get("/",function(req,res){
  res.render("home");
});

app.get("/campgrounds",function(req,res){
	Camp.find({},function(err,camps){
		if(err){
			console.log("Error while searching for camps");
		}
		else{
			res.render("campgrounds",{camps:camps});
		}
	});
});


app.post("/campgrounds",function(req,res){
	var isValid = true;
	var camp = {};
	keys = ["name","src","desc"];
	for(var i=0;i<keys.length;i++){
		if (!(keys[i] in req.body && req.body[keys[i]] !== "")){
			isValid = false;
			break;
		}
		camp[keys[i]] = req.body[keys[i]];
	}
	console.log(camp);
	if (isValid){
		Camp.create(camp,function(err,obj){
			if (err){
				console.log("error while creation");
				res.redirect("/campgrounds/new");
			}
			else{
				res.redirect("/campgrounds");				
			}
		});
	}
	else{
		res.redirect("/campgrounds/new");
	}
});

app.get("/campgrounds/new",function(req,res){
	res.render("newCampground");
});

app.get("/campgrounds/:id",function(req,res){
	Camp.findOne({_id: req.params.id},function(err,camp){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.render("campground",{camp:camp});
		}
	});
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Application started successfully on "+process.env.IP+":"+process.env.PORT);
});