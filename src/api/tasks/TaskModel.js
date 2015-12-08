import mongoose from 'mongoose';

let TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name : {
    type: String,
    required: true,
    default: ''
  },
  description : {
    type: String,
    default: ''
  },
  type : {
    type: Number,
    default: 1 // 1 = credits to accrued time, -1 = debits from acrrued time
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Task', TaskSchema);
