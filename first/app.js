"use strict";

var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Hi There!");
});

app.get("/speak/:animal",function(req,res){
    res.send("The "+req.params.animal+" says its language");
});

app.get("/repeat/:word/:num",function(req,res){
    let num = Number(req.params.num);
    if ( !isNaN(num) && num%1 === 0 && num > 0){
        var returnString = "";
        for(var i=0;i<num;i++){
            returnString+= req.params.word+"\n";
        }
        res.send(returnString);
    }
    else{
        res.send("Not valid");
    }
});

app.get("*",function(req,res){
    res.send("404");
});

app.listen(3000);
