const mongoose=require('mongoose');
require('mongoose-type-email');
const Schema=mongoose.Schema;

// Create Schema
const UserSchema= new Schema({
  firstname:{
    type:String,
    required: true
  },
  lastname:{
    type:String,
    required: true
  },
  gender:{
    type:String,
    required:true
  },
  email:{
    type: mongoose.SchemaTypes.Email,
     required: true
  },
  phno:{
    type:String,
    required:true
  },
  password:{
    type: String,
    required: true
  },
  confirmpassword:{
    type: String,
    required: true
  }
});
mongoose.model('users',UserSchema);