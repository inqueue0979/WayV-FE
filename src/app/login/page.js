"use client";

import { signIn } from 'next-auth/react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}

export default LoginPage;