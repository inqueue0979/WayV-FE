import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "@/app/firebase/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';

const handler = NextAuth({  
	providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
	  }),
	],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Firestore에 사용자 정보 저장
      const userRef = doc(firestore, 'users', user.id);
      await setDoc(userRef, {
        name: user.name,
        email: user.email,
        image: user.image,
        lastLogin: new Date().toISOString(),
      }, { merge: true });
      return true;
    },
    async session({ session, token }) {
      // 세션에 프로필 사진 추가
      session.user.image = token.picture; // Google 프로필 사진 URL
      return session;
    },
    async jwt({ token, account, profile }) {
      // 처음 로그인할 때 Google 프로필 사진을 token에 저장
      if (account && profile) {
        token.picture = profile.picture;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };