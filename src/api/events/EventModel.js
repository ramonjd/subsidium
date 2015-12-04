import mongoose from 'mongoose';

let EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  description : {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : 'User'
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : 'Activity'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Event', EventSchema);
