var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_FACTOR = 10;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  uname: {type:String, require: true, unique: true},
    //select false on password, so it mongo won't return the collumn/field
    //for password unless we specifically request it with +password
  password:{type: String, select:false, require: true}
});

UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt){
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
