const mongoose=require('mongoose');
require('mongoose-type-email');
const Schema=mongoose.Schema;
const constants = require('../../constants');
var uniqueValidator = require('mongoose-unique-validator');

// Create Schema
const users= new Schema({
  email:{
   // type: mongoose.SchemaTypes.Email,
    type: String,
    //required: true,
    unique: true
  },
 /* first_name:{
    type:String,
    required: true
  },
  last_name:{
    type:String,
    required: true
  },
  gender:{
    type:String,
    required:true
  },
  phone_no:{
    type:String,
    required:true
  },
  password:{
    type: String,
    required: true
  },
  location:[{
    type: Schema.Types.ObjectId, ref: 'locations',
    required: true
  }],
  min_budget:{
    type:Number,
    required: true
  },
  max_budget:{
    type: Number,
    required: true
  },
  room_sharing:{
    type: Boolean,
    required: true
  },
  earliest_move_in_date:{
    type: Date,
    required: true
  },
  latest_move_in_date:{
    type: Date,
    required: true
  },
  dietary_habit:{
    type: String,
    required: true
  },
  smoking_habit:{
    type: String,
    required: true
  },
  alcoholic_habit:{
    type:String,
    required: true
  },
  status:{
    type: String,
    required: true,
    default: constants.AVAILABLE
  }*/
});
mongoose.model('users',users);