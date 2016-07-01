var express = require("express");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Camp = require("./models/camp");

var app = express();

mongoose.connect("mongodb://localhost/yelpcamp");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("view engine", "ejs");

/**
 * Home Page
 */
app.get("/",function(req,res){
  res.render("home");
});


/**
 * Render all campgrounds
 */
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

/**
 * Create a new campground
 */
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
	if (isValid){
		camp.desc = req.sanitize(camp.desc);
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


/**
 * Display form for making new campground
 */

app.get("/campgrounds/new",function(req,res){
	res.render("newCampground");
});


/**
 * display details of a campground
 */
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

/**
 * Edit info of a campground
 */
app.put("/campgrounds/:id",function(req,res) {
	Camp.findOne({ _id: req.params.id }, function (err, camp){
		if(err){
			res.redirect("/campgrounds/"+req.params.id+"/edit/");
		}
		var isValid = true;
		keys = ["name","src","desc"];
		for(var i=0;i<keys.length;i++){
			if (!(keys[i] in req.body && req.body[keys[i]] !== "")){
				isValid = false;
				break;
			}
			camp[keys[i]] = req.body[keys[i]];
		}
		if (isValid){
			camp.desc = req.sanitize(camp.desc);
			camp.save();
			res.redirect("/campgrounds/"+req.params.id+"/");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id+"/edit/");
		}
	});
});

/**
 * remove a campground
 */

app.delete("/campgrounds/:id",function(req,res){
	Camp.findOne({_id: req.params.id}, function(err,camp){
		if(err){
			res.redirect("/campgrounds/"+req.params.id+"/");
		}
		else{
			camp.remove();
			res.redirect("/campgrounds/");
		}
	});
});

/**
 * display edit form of a campground
 */

app.get("/campgrounds/:id/edit",function(req,res){
	Camp.findOne({_id: req.params.id},function(err,camp){
		if(err){
			res.redirect("/campgrounds/");
		}
		else{
			res.render("editCamp",{camp:camp});
		}
	});
});


/**
 * Start the server
 */

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Application started successfully on "+process.env.IP+":"+process.env.PORT);
});
