import { Message } from "@/model/User"; // Api response me massage bhi show karna hai to import kar rahe hai come from user model

// type define kar rahe hai to interface rahta hi hai
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>
};
