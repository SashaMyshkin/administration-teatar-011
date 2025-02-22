import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
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

        let user;

        try{
          user = await getUserFromDB(String(credentials.username), String(credentials.password));
        } catch(err){
          //console.log(err)
          throw new AuthError("Database error.")
        }

        if (!user) {
          throw new CredentialsSignin("Invalid credentials.",);
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  session: {
    maxAge: 15*60, // 15 minutes
    updateAge: 5*60 // 5 minutes
  },
  trustHost:true
});
