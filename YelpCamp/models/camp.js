var mongoose = require("mongoose");

var campSchema = mongoose.Schema({
	name: String,
	src: String,
	desc: String,
});

module.exports = mongoose.model("Camp",campSchema);
