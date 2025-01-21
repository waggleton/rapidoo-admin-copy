import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import google_redirect from '@/app/auth/google_signin_success/page';
import Cookies from 'js-cookie';

const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';

const gmailSignIn = async (email) => {
  try {
    const response = await fetch(ADMIN_BASE_URL + "google_signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (response.ok) {
      if (data.message === "email found") {
        return data.id;
      } else if (data.message === "email not found") {
        return data.id;
      }
    } else {
      console.error("API login failed");
    }
  } catch (error) {
    console.error("An error occurred while posting login data:", error);
  }
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) { 
      const signInResult = await gmailSignIn(profile.email);

      if (signInResult) {
        return `/auth/google_signin_success?email=${encodeURIComponent(profile.email)}&user=${encodeURIComponent(profile.name)}&id=${encodeURIComponent(signInResult)}`;
      } else {
        return `/auth/google_signup?email=${encodeURIComponent(profile.email)}&user=${encodeURIComponent(profile.name)}`;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Add user's email to the token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email; // Add email to session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
