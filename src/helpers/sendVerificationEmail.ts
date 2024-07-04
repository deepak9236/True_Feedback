import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  // data le rahe hai email send karne se pehle 
  email: string,
  username: string,
  verifyCode: string
  // promise return karega jo ApiResponse type ka hoga
): Promise<ApiResponse> {
  try {
    // console.log(email, username, verifyCode,"jshdj");
    
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}

