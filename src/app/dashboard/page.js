"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Project_Card from "../components/dashboard/Project_Card";

export default function Home() {
  const [link, setLink] = useState("");  // Input의 값을 관리하는 상태

  return (
    <main className="min-h-screen max-w-screen-xl mt-28 mx-auto p-3">
      <h1>프로젝트 둘러보기</h1>
      <p className="text-gray-500 mt-0 mb-6">웹 접근성 프로젝트를 한 눈에 보고, 추가하거나 관리할 수 있습니다.</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 flex-col items-center justify-center gap-4">
        <Project_Card Title="WayV 4.20 Project" Description="Lorem Ipsum" />
        <Project_Card Title="척척 Project" Description="Lorem Ipsum" />
        <Project_Card Title="페어 Project" Description="Lorem Ipsum" />
        <Project_Card Title="약손 Project" Description="Lorem Ipsum" />
      </div>
    </main>
  );
}