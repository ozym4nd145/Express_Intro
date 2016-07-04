var express = require("express");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
mongoose.connect("mongodb://localhost/auth_demo");

var app = express();

app.use(require("express-session")({
  secret: "I will become a legendary programmer and change the world.",
  resave: false,
  saveUninitialized: false,
}));

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 *
 =======================================================================
 Routes
 ========================================================================
 */
app.get("/",function(req,res){
  res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
  res.render("secret");
});

/**
 * Register Form
 */

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  User.register(new User({username: req.body.username}),req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secret");
    });
  });
});

/**
 * Login Form
 */

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",passport.authenticate("local",{
  successRedirect: "/secret",
  failureRedirect: "/login"
}),function(req,res){
});

/**
 * Logout
 */
app.get("/logout",function (req,res) {
  req.logout();
  res.redirect("/");
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Application started successfully on "+process.env.IP+":"+process.env.PORT);
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
