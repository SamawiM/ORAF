const mongoose=require('mongoose');
require('mongoose-type-email');

// Create Search Schema
const SearchSchema= new Schema({
  location:[{
    type: Schema.Types.ObjectId, ref: 'locations',
    required: true
  }],
  min_budget:{
    type:Number,
    required:false
  },
  max_budget:{
    type: Number,
    required: false
  },
  room_sharing:{
    type: Boolean,
    required: false
  },
  earliest_move_in_date:{
    type: Date,
    required: false
  },
  latest_move_in_date:{
    type: Date,
    required: false
  },
  gender:{
    type:String,
    required:false
  },
  dietary_habit:{
        type:String,
        required: false
  },
  smoking_habit:{
    type:String,
    required: false
  },
  alcoholic_habit:{
    type: String,
     required: false
  }
});
mongoose.model('search_history',SearchSchema);