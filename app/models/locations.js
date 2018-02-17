const mongoose=require('mongoose');
require('mongoose-type-email');

// Create Location Schema
const LocationSchema= new Schema({
  location_name:{
        type:String,
        required: true
  }
})

mongoose.model('locations',LocationSchema);