"use client";

import { signIn } from 'next-auth/react';

function LoginPage() {
  return (
    <div className=' mt-20'>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>Google로 로그인</button>
    </div>
  );
}

export default LoginPage;