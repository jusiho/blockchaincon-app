// imports
import NextAuth from "next-auth";

// importing providers
import CredentialsProvider from "next-auth/providers/credentials";

async function fetchLogin(email: string, pass: string) {
  console.log("email : ", email);
  console.log("email : ", pass);

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ username: email, password: pass }),
      }
    );

    if (!res.ok) {
      const response = await res.json();

      return {
        errors: { message: response.message },
      };
    }

    return await res.json();
  } catch (error) {
    // TypeError: Failed to fetch
    console.log("There was an error", error);
  }
}

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const { username, pass } = credentials as {
          username: string;
          pass: string;
        };

        // Add logic here to look up the user from the credentials supplied
        const response = await fetchLogin(username, pass);

        if (!response.errors) {
          const user = {
            id: response.user_nicename,
            name: response.user_nicename,
            email: response.user_email,
            token: response.token,
          };

          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        throw new Error(response.errors.message);
        // If you return null then an error will be displayed advising the user to check their details.
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      console.log("user : ", user);
      console.log("account : ", account);

      // Initial sign in
      if (user) {
        console.log("user : ", user);

        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }: any) {
      console.log("session : ", session);
      console.log("token : ", token);

      if (token) {
        session.user = token;
      }
      // Add property to session, like an access_token from a provider.

      return session;
    },
  },
};
const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
