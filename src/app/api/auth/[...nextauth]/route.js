import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "@/app/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from 'firebase/firestore';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Firestore에서 사용자 문서를 참조
      const userRef = doc(firestore, 'users', user.id);
      const userDoc = await getDoc(userRef);

      // 사용자 데이터가 Firestore에 없다면, 처음 로그인으로 간주하여 기본 권한 설정
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.name,
          email: user.email,
          image: user.image,
          permission: 1, // 기본 권한을 'basic'으로 설정
          lastLogin: new Date().toISOString(),
        });
      } else {
        // 이미 Firestore에 사용자 정보가 있다면 마지막 로그인 시간 업데이트
        await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
      }

      return true;
    },

    async session({ session, token }) {
      // Firestore에서 사용자 권한 가져오기
      const userRef = doc(firestore, 'users', token.sub);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        session.user.permission = userData.permission; // 세션에 Firestore에서 가져온 권한 설정
        session.user.image = userData.image || token.picture; // Firestore나 Google 이미지 사용
      } else {
        session.user.permission = 1; // 데이터가 없으면 기본 권한 제공
      }

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