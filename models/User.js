const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  dob: Date,
  phoneNumber: String,
  userType: {
    type: String,
    enum: ['msme', 'creator'],
    required: true,
  },
  // MSME specific fields
  businessName: String,
  companyRegNumber: String,
  gstNumber: String,
  // Student Creator specific fields
  collegeName: String,
  specialization: String,
}, {
  timestamps: true, // This adds createdAt and updatedAt fields
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
