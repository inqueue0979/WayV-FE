"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; // 현재 경로를 가져오는 훅
import { Project_Combobox } from "./projects/Project_Combobox";
import { User_Profile_Dropdown } from "./User_Profile_Dropdown";

export default function Navbar() {

    const { data: session } = useSession(); // 세션 정보를 가져옴
    const pathname = usePathname(); // 현재 경로를 가져옴

    // 세션에서 토큰 개수를 가져옴
    const token = session?.user.token;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-opacity-60 backdrop-blur-sm bg-white border-gray-200 border-b-[1px]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <div className=" flex gap-3"> 
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="wayv.png" className="h-8" alt="WayV 로고" />
                    </Link>

                    {/* 경로에 따라 Project_Combobox 또는 webridge를 렌더링 */}
                    {session && pathname.startsWith("/dashboard") || pathname.startsWith("/project") ? (
                        <Project_Combobox />
                    ) : (
                        <p className="SUIT-SB text-2xl">webridge</p>
                    )}
                    
                </div>
                <div className="flex items-center w-auto" id="navbar-default">
                    <ul className="flex items-center space-x-6 font-medium p-0 border-gray-100 rounded-lg flex-row mt-0 border-0">
                        <li>
                            <Link href="https://solveitwayv.vercel.app" className="block py-2 px-3 rounded bg-transparent" aria-current="page">팀 페이지</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li>
                        {session ? (
                            <User_Profile_Dropdown />
                        ) : (
                            <Link href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">로그인</Link>
                        )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}