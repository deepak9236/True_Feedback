import 'next-auth';

// next-auth me jo module likha hai pehle se usme changes karke apna module banana rahe hai taki data retrive kar paye next-auth se 
// next auth ke jo module hai usko re-define ka paunga--> go:- app ---> api--> auth--> [...nextauth]--> option.ts
declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession['user']; // jo default Session hai uske andar key chahiya jo user hoga
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

// next-auth/jwt directly bhi modify kar sakte hai.. (extra knowlage)[ya code se link nahi hai]
declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}