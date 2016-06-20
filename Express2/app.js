var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/custom/:data",function(req,res){
	var data = req.params.data;
	res.render("custom",{data: data});
});


app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Application started successfully on "+process.env.IP+":"+process.env.PORT);
});

