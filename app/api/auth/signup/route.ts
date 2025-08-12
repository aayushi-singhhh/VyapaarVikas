import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User model schema
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
  // Google OAuth fields
  isGoogleAuth: {
    type: Boolean,
    default: false,
  },
  googleId: String,
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
      phoneNumber, 
      userType,
      businessName,
      companyRegNumber,
      gstNumber,
      collegeName,
      specialization,
      isGoogleAuth,
      googleId
    } = body;

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      userType,
    };

    // Add Google auth fields if present
    if (isGoogleAuth) {
      userData.isGoogleAuth = true;
      userData.googleId = googleId;
    }

    // Add type-specific fields
    if (userType === 'msme') {
      userData.businessName = businessName;
      userData.companyRegNumber = companyRegNumber;
      userData.gstNumber = gstNumber;
    } else if (userType === 'creator') {
      userData.collegeName = collegeName;
      userData.specialization = specialization;
    }

    // Create user
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        userType: user.userType 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
