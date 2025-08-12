import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// User model schema (same as in signup)
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
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Connect to MongoDB
async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Fetch all users (excluding passwords)
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users: users,
    });

  } catch (error) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
