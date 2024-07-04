// AuthProvider ka wrapper bannaye hai
// app-> layout.tsx ko wrap kar dega AuthProvider se
// wrap karne se Authentication ka access sabhi component me aa jayega jo hum(auth folder me bannaye hai backend me(option.ts, route.ts))
// dekha jaye to hum <SessionProvider> se wrap kar rahe hai(sabhi component es file se hi pass hoga)
'use client';
import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
