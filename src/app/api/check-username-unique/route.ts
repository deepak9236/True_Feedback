import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

// username check kar rahe hai valid hai ki nahi 
const UsernameQuerySchema = z.object({
  username: usernameValidation,  // username--> usernameValidation ko fullfill karta hai
});

export async function GET(request: Request) {
  // Ya ek extra check hai jo postman ko battayega ki hum yaha par GET request hi access kar rahe hai
  // ab ya use nahi hota next.js ki leatest version me
  // TODO: use this in all other routes
  if (request.method !== 'GET') {
    return Response.json(
      {
        success: false,
        message: 'Only GET method is Allowed',
      },
      { status: 405 })
  }

  await dbConnect();

  try {
    // url se username check kar rahe hai
    // localhost:3000/api/cuu?username=hitesh?phone=android --> bas username nikaal rahe hai
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get('username'), // username nikal rahe hai
    };

    // validation kar rahe hai zod ke sath  username agar pass hoga to username aa jayega
    const result = UsernameQuerySchema.safeParse(queryParams);
    // console.log(result); // TODO: Remove
    
    // username me error hai
    if (!result.success) {
      // jo bhi error hai username usernameErrors me aa jayega 
      const usernameErrors = result.error.format().username?._errors || [];
      // agar error hai to success, message, status response return kar dega
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0  // 0 se jada error hai tab , laga kar return ho jayga
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    // agar username pass hua hai to username store kar lo username me
    const { username } = result.data;
    // agar username already exist hai to database me   username, isVerified: true, hona chahiya
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    // agar username already exist hai to existingVerifiedUser me database
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 200 }
      );
    }

    // agar username not already exist in database
    return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}
