"use client";

import { useState } from "react";
import Project_Card from "../components/dashboard/Project_Card";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [link, setLink] = useState("");  // Input의 값을 관리하는 상태
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen max-w-screen-xl mt-28 mx-auto p-3">
      { status === "loading" ? (
        <p className=" text-sm text-gray-500">계정 정보 로딩 중..</p>
        ) : (
          <p className=" text-sm text-gray-500">{session.user.name + " " + session.user.email}</p>
        ) }
      <h1>프로젝트 둘러보기</h1>
      <p className="text-gray-500 mt-0 mb-6">웹 접근성 프로젝트를 한 눈에 보고, 추가하거나 관리할 수 있습니다.</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 flex-col items-center justify-center gap-4">
        <Project_Card Title="WayV 4.20 Project" project_id="webridge" Description="Lorem Ipsum" />
        <Project_Card Title="Google Web Project" project_id="google" Description="Lorem Ipsum" />
        <Project_Card Title="Naver Web Project" project_id="naver" Description="Lorem Ipsum" />
        <Project_Card Title="Kookmin Univ. Project" project_id="kookmin" Description="Lorem Ipsum" />
      </div>
    </main>
  );
}