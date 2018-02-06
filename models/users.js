const mongoose=require('mongoose');
require('mongoose-type-email');
const Schema=mongoose.Schema;

// Create Schema
const UserSchema= new Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type: mongoose.SchemaTypes.Email,
     required: true
  },
  password:{
    type: String,
    required: true
  }
});
mongoose.model('users',UserSchema);