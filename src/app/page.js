"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [link, setLink] = useState("");  // Input의 값을 관리하는 상태

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gradient-to-r from-blue-300 to-green-300 p-4 rounded-3xl mb-1">
          <Image src="/wayv.png" alt="WayV 로고" width={100} height={100} />
        </div>
        <p className="Pretendard-Bold text-xl">웹브릿지</p>
        <p className="text-sm"><strong className="Pretendard-Bold">웹 접근성</strong> 검사 툴킷</p>
        <div className="mt-8">
          <h1 className="text-2xl m-4 text-center">
            <strong className="Pretendard-Bold">링크 입력 한 번</strong>으로<br />
            <strong className="Pretendard-Bold">웹 접근성</strong>을 확인해 보세요!
          </h1>
        </div>

        <div className="flex w-full max-w-xl items-center space-x-2">
          <Input
            id="Link"
            placeholder="링크 입력 (HTTP/HTTPS 명시)"
            value={link}
            onChange={(e) => setLink(e.target.value)}  // Input 값 업데이트
          />
          <Link
            href={`/solution?url=${encodeURIComponent(link)}`}
            className="bg-gray-800 text-white py-2 px-4 rounded-lg w-20 text-center hover:bg-gray-700"
          >
            <p className="text-md">제출</p>
          </Link>
        </div>
      </div>
    </main>
  );
}