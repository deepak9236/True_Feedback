import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    // frontend sends a request to this endpoint with the following data
    const { username, email, password } = await request.json();

    // check username hai aur vo verified bhi hai 
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    // user mil gaya hai database jo verify hai pehle se: true
    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 400 }
      );
    }

    // es bar user email check kar raha hai database me hai ki nahi 
    const existingUserByEmail = await UserModel.findOne({ email });
    // verify code generate kar rahe hai
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // agar user by email database me mil jata hai
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) { // user email verify already hai
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {  // user hai par verify nahi hai  
        const hashedPassword = await bcrypt.hash(password, 10); // password encrypt kar raha hai
        existingUserByEmail.password = hashedPassword; // new password save kar rahe but database me user exist karta hai bas verify nahi hai.
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // verify code 1 hour expire ho jayga
        await existingUserByEmail.save();  // database me save kar diya
      }
    } else { //  agar user by email se database me nahi milta tab user create ho jayga 
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(); // object return kar raha hai
      expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour of expiry

      // model banne hai aur database me save kar rahe hai
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword, // password change huaa hai 
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save(); // save kar rahe hai database me
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) { // agar verify nahi user tab
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    //  agar emailResponse pehle se success hai tab
    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
