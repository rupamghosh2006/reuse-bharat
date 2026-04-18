import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['donor', 'receiver', 'admin'],
    default: 'donor'
  },
  ecoScore: {
    type: Number,
    default: 0
  },
  savedItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  totalImpact: {
    meals: { type: Number, default: 0 },
    medicine: { type: Number, default: 0 },
    books: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);