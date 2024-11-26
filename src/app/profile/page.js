"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const [link, setLink] = useState("");  // Input의 값을 관리하는 상태

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="">
        Profile Page
      </div>
    </main>
  );
}