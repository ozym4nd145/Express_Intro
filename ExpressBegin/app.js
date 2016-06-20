var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("Hi There!");
});

app.listen(3000,function(){
	console.log("Started on port 3000");
});