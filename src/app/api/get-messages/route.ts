import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  // _user._id:- ya string me hai check in:- next-auth.d.ts
  // _user._id:- but humko string nahi chahiya aggrigation pipeline me
  // mongoose.Types.ObjectId(_user._id):- _user._id ko mongoose ka object id me convert kar rahe hai. 
  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    // aggregation pipeline:-
    const user = await UserModel.aggregate([
      // sabhi pipeline:- {} me lekhi jati hai
      { $match: { _id: userId } }, // first pipeline:- id match kar rahe hai 
      { $unwind: '$messages' }, // secound pipeline:- $unwind:- array par lagate hai :- ' messages' vale parameter par lagana hai
      { $sort: { 'messages.createdAt': -1 } }, // third pipeline:- sort kar rahe hai messages ke createdAt parameter ke basis par
      { $group: { _id: '$_id', messages: { $push: '$messages' } } }, // five pipeline:- group kar rahe hai 
    ]).exec();

    // aggregation pipeline se user mila hi nahi
    if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { messages: user[0].messages }, // sabhi massage ja hai jo aggrigate ho kar aa raha hai
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}