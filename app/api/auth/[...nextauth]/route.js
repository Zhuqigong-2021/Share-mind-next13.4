import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      console.log(profile);
      try {
        await connectToDB();

        //check if a user alread exists
        const userExists = await User.findOne({ email: profile.email });

        //if not, create  a new user and save it to the db
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            url: profile.url ? profile.url : " ",
          });
          return true;
        }
        return true;
      } catch (error) {
        console.log(error);
        console.log("for test only");
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
