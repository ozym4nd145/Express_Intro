#! /bin/bash

mkdir $1
mkdir $1/views
cp -r template/public $1/
cp -r template/partials $1/views/
touch $1/app.js

echo "{
  \"name\": \"first\",
  \"version\": \"1.0.0\",
  \"description\": \"First node express project\",
  \"main\": \"app.js\",
  \"scripts\": {
    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"
  },
  \"author\": \"\",
  \"license\": \"ISC\",
  \"dependencies\": {
    \"express\": \"^4.14.0\",
    \"body-parser\": \"^1.15.2\",
    \"ejs\": \"^2.4.2\",
    \"mongoose\": \"^4.5.1\"
  }
}" > $1/package.json

echo "var express = require(\"express\");
var app = express();
var bodyParser = require(\"body-parser\");
app.use(express.static(\"public\"));
app.set(\"view engine\", \"ejs\");
app.use(bodyParser.urlencoded({ extended: true }));

app.get(\"/\",function(req,res){
  res.render(\"home\");
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log(\"Application started successfully on \"+process.env.IP+\":\"+process.env.PORT);
});
" > $1/app.js