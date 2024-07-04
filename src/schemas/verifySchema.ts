import { z } from 'zod';

// validation kar rahe hai jo object reciave  ho raha hai 
// object string ho uska length dekh rahe hai 6 charecter ka ho 
export const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

