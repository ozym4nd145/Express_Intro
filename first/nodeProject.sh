#! /bin/bash

mkdir $1

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
    \"express\": \"^4.14.0\"
  }
}" > $1/package.json

echo "var express = require(\"express\");
var app = express();	
" > $1/app.js