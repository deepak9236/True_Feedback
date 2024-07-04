import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

// option route me use hoga
export const authOptions: NextAuthOptions = {
  // Provider me kis basis par login kar na vo ata hai Like:- GithubProvider, CredentialsProvider, etc.. 
  providers: [ 
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // upar wale credentials authorize karega:- promise return ho raha hai
      // GithubProvider agar hota to authorize ki jaurat nahi padati but khud ka CredentialsProvider hai to authorize likhana padega. 
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [ // [$or:- means email ya username koi bhi]
              { email: credentials.identifier }, // credentials me se email nikal kar data base me find kar raha hai[credentials.identifier.email :- hai but es6 ki vajh se , email nahi likhana padta]
              { username: credentials.identifier },
            ],
          });
          if (!user) { // user nahi mila
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) { // user hai but verified nahi hai 
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare( // database ka password and credentials ka password compair kar rahe hai
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user; // ya return provider ke pass ja raha hai jo upar mention hai
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  // 
  callbacks: {
    async jwt({ token, user }) { // token ke andar aur data store kar rahe hai esse payload ka size increase ho jayga jo less optimize hoga but agar ya nahi kare gaye tab database query karna hoga   
      if (user) { // user provider me se aa raha hai jo upar hai
        // user me se data nikalne ke liya pehle type declare karna hoga:- go type--> next-auth.ts file diractory
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token; // ab token ke andar bahut sara data hai
    },
    async session({ session, token }) { // token se session me data pass kar rahe hai
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  // session strategy ya bataa raha hai ki humara session kis basis par manage  ho raha hai(jwt ke basis par)
  session: { // jwt ke basis par login kara rahe hai
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { // Next.js me pages by Default /auth/sign-in aata hai:- humko auth nahi chahiya es liya hum OverRight kar rahe hai /sign-in se
    signIn: '/sign-in',
  },

};

// conclusion:-
// 1:- CredentialsProvider me hum check kar rahe hai ki user jo sign-up ho raha hai vo authentic user hai ki nahi.
// 2:- agar User authentic hai tab callbacke ke andar user ka data token me pass kar rahe hai(and same as token to session)
// 3:- session strategy ya bataa raha hai ki humara session kis basis par manage  ho raha hai(jwt ke basis par)