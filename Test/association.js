var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/association");

var postSchema = mongoose.Schema({
  title: String,
  comment: String,
});

var Post = mongoose.model("Post",postSchema);

var userSchema = mongoose.Schema({
  name: String,
  posts: [postSchema],
});

var User = mongoose.model("User",userSchema);

var user = new User({
  name: "Suyash",
});

user.save(function(err){
  console.log("hahaha");
});
console.log("User saved");

var post = new Post({
  title: "How to cook",
  comment: "Bwahahahhahah"
});

post.save(function(err){
  console.log("hahhahhhahahhaha");
})

console.log("Post saved");


console.log(user);
console.log(post);

user.posts.push(post);

console.log(user);
console.log(post);
console.log("Pushed but not saved");

user.save(function(){
  console.log("save internal");
});
console.log("Saved external");

post.remove(function(){
  console.log(user);
})
