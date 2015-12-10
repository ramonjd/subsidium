import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  password: String,
  name: {
    type: String,
    default: '',
    required: true
  },
  phone : {
    type: String,
    default: ''
  },
  email : {
    type: String,
    default: ''
  },
  status : {
    type : Number,
    default : 0 // 0 = user, 1 = admin
  },
  accruedHours : [{
    hours : {
      type : Number,
      default : 0 
    },
    activityId : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : 'Activity'
    },
    created : {
      type: Date,
      default: Date.now
    }
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);
