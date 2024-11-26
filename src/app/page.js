"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [link, setLink] = useState("");  // Input의 값을 관리하는 상태

  return (
    <section>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gradient-to-r from-blue-300 to-green-300 p-4 rounded-3xl mb-1">
          <Image src="/wayv.png" alt="WayV 로고" width={100} height={100} />
        </div>
        <p className="SUIT-SB text-xl">webridge</p>
        <p className="text-sm"><strong className="Pretendard-Bold">웹 접근성</strong> 검사 툴킷</p>
        <div className="mt-2">
          <p className="text-md m-4 text-center">
            가장 완벽한 <strong className="Pretendard-Bold">AI 웹 접근성</strong> 솔루션
          </p>
        </div>

        <div className="flex text-center space-x-2">
          <Link
            href={`/dashboard`} className="bg-black text-white py-2 px-4 rounded-lg text-center hover:bg-gray-700">
            <p className="text-md">지금 사용하러 가기</p>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </section>
    
  );
}