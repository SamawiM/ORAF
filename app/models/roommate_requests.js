const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Create Schema
const RoommateRequest= new Schema({
  senderId:{
    type:Schema.Types.ObjectId, ref: 'users',
    required: true,
    unique: true
  },
  receiverid:{
    type:Schema.Types.ObjectId, ref: 'users',
    required: true,
    unique: true
  }
});
mongoose.model('roommate_requests',RoommateRequest); 