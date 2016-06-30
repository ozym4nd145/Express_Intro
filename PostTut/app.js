var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req,res){
	res.render("home");
});

var friends = ["Aditya","Tarun","Nimish","Anurag","Gaurav","Pandey"];

app.post("/friends/new",function(req,res){
	console.log(req.body);
	if ("name" in req.body && req.body.name !== ""){
		friends.push(req.body.name);
	}
	res.redirect("/friends");
});

app.get("/friends",function(req,res){
	res.render("friend",{friends:friends});
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Application started successfully on "+process.env.IP+":"+process.env.PORT);
});

