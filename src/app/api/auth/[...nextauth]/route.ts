import NextAuth from 'next-auth/next';
import { authOptions } from './options';

// NextAuth authOptions lega
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Note:- Main hum ko route.ts hi chahiya lekin route ka kuch code option me likha kar organize kiya hai code ko
