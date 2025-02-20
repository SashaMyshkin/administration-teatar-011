import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDB } from "@lib/auth";
import { redirect } from "next/dist/server/api-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
      
        console.log("I am here")
				const user = await getUserFromDB(String(credentials.username), String(credentials.password));
        console.log("Custom user", user)

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  session: {
    maxAge: 10, // 30 days
    updateAge: 0 // 1 day
  },
  debug:true,
});
