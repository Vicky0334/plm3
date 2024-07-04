const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://0.0.0.0/plmbackup");
const userSchema = mongoose.Schema({
username:String,
password:String,
email:String,

});
 userSchema.plugin(plm);
 module.exports = mongoose.model("user",userSchema);