import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const resLogin = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/login`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );
          let data = await resLogin.json();

          if (resLogin.status == 200) {
            return data;
          } else {
            throw new Error(data.detail);
          }
        } catch (error) {
          if (error.cause.code == "ECONNREFUSED") {
            throw new Error("Server Error");
          }
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/403",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
