npx create-next-app@latest


Model --> folder
    User.ts

schemas--> folder
Note:- Zod:- Schema validation me help karta hai typescript ke sath.. mongoose tak jane ki jarurat nahi hogi
    signUpSchema.ts
    verifySchema.ts
    signInSchema.ts
    acceptMessageSchema.ts
    messageSchema.ts

Notes:- Next js me sabhi chiza all time running nahi hoti jaise jaise demand hota vasha hum use me leta chizo ko next js me(next js edge time framework hota hai)
        Database bhi all time connected nahi hota(jaise- jaise request jata hai usi database connection banta hai(next js me humko pehle check karna chahiya database already to nahi hai))
        check always database connection pehle se hai ki nahi (nahi hai to database connect karo) 

.env 

lib--> folder
    dbConnect.ts
    resend.ts

npm install resend
go url:- https://resend.com/
add api key and give permission fully access

npm install react-email
emails --> outside src folder
    VerificationEmail.tsx

helpers --> folder
    sendVerificationEmail.ts

types --> folder
    ApiResponse.ts

photo:- 3a



npm install bcrypt.js
app ---> api--> sign-up folder
    route.ts

// https://next-auth.js.org/providers/credentials
// https://next-auth.js.org/configuration/callbacks
app ---> api--> auth--> [...nextauth]
    option.ts
    route.ts

src --> types->next-auth.d.ts

src --> context--> AuthProvider.tsx(frontend ka part hai)
Note:-
    <SessionProvider> me wrap karna hota hai AuthProvider ko run karne ke liya
    <AuthProvider> hi <SessionProvider> hai

src--> app--> layout.tsx--> (frontend ka part hai)
    Note:- AuthProvider se wrap kiya hai

src--> middleware.ts
Note:- Next-auth bina middleware ke run nahi kare ga

api-->check-username-unique--> route.ts

api-->verify-code-->route.ts

api-->accept-messages-->route.ts

api-->get-messages-->route.ts

api-->send-message-->route.ts

https://sdk.vercel.ai/docs/getting-started/nextjs-app-router
npm install ai openai

api-->suggest-messages-->route.ts

// https://ui.shadcn.com/docs/installation/next
npx shadcn-ui@latest init
Which style would you like to use? Default
Which color would you like to use as base color? Slate
Would you like to use CSS variables for colors? yes

// form add by shadcn:-
npx shadcn-ui@latest add form
check components--> ui

// https://ui.shadcn.com/docs/components/toast
npx shadcn-ui@latest add toast
layout me <Toaster/> add karna hoga

app-->(auth)--> sign-up-->page.tsx

app-->(auth)--> sign-in-->page.tsx




project name:- Truly Feedback FullStack project
fullStack Mern Project in nextjs
use:- shadcn, Zod, custom authantication, otp for user verifecation, use for AI to genrate Suggestion messages
project discription:-  anyonumus feedback recive from different user after genrating feedback link
realtime username checking in database
use jwt 


Project: "Truly Feedback" - Full-Stack MERN Project in Next.js
Technology Stack: Utilized Next.js framework, integrated Shadcn and Zod for data management and validation.
Authentication: Implemented custom authentication system with OTP verification for secure user access.
AI Integration: Incorporated AI to generate personalized suggestion messages based on anonymous user feedback.
Objective: Developed a platform to receive and process anonymous messages for insightful feedback collection.


Truly Feedback - Full-Stack MERN Project in Next.js
Tech Stack: Built with Next.js, using Shadcn and Zod for robust data management.
Security: Implemented custom OTP-based authentication for secure user verification.
AI Enhancement: Integrated AI for generating tailored suggestion messages from anonymous feedback.





Project: Truly Feedback FullStack
Purpose: Created a platform for securely receiving anonymous feedback via generated links to provide valuable insights.
Security and Authentication: Implemented JWT-based authentication with OTP verification for robust security using Shadcn and Zod frameworks.
Innovative Features: Integrated AI to generate personalized suggestion messages, enhancing user engagement and insights, and real-time username validation.
Technologies Used: Next.js with TypeScript, TailwindCSS, Node.js, MongoDB, Vercel



Admin Dashboard FullStack:
Developed a comprehensive admin dashboard with real-time data visualization, including user distribution by country using Nivo geography chart, and revenue and sales unit trends with line charts for daily, monthly, and yearly metrics.
Implemented state management with Redux RTK toolkit, ensuring efficient data flow between the React frontend and MongoDB backend, leveraging aggregate queries for optimized data retrieval.
Tech: React, Redux RTK, Node.js, MongoDB

Admin Dashboard FullStack:

Tech: React, Redux RTK, TailwindCSS, Node.js, Express.js, MongoDB, Vercel
