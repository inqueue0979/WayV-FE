"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {

    const { data: session } = useSession(); //세션 정보를 가져옴

    // permission에 따라서 계정 단계를 나타냄
    // permission: 'basic', 'pro', 'admin' 중 하나
    // 'basic'은 유료 계정 비활성화 버튼을 보여주지 않음
    // 'pro'와 'admin'은 유료 계정 비활성화 버튼을 보여줌
    const permission = session?.user.permission;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-opacity-60 backdrop-blur-sm bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="wayv.png" className="h-8" alt="WayV 로고" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap Pretendard-Bold">WeBridge</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:flex md:items-center md:w-auto" id="navbar-default">
                    <ul className="flex items-center space-x-8 font-medium flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link href="https://solveitwayv.vercel.app" className="Pretendard-Bold block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-500 md:p-0 md:dark:text-blue-500" aria-current="page">팀 페이지</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li>
                        {session ? (
                            <button
                                onClick={() => signOut({ callbackUrl: '/projects' })}
                                className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                <img
                                    src={session.user.image}
                                    alt="Google 프로필 사진"
                                    className="w-6 h-6 rounded-full"
                                />
                                
                                {permission === 1 ? (
                                    <span className="text-xs Pretendard-Bold text-white ml-2 rounded-lg p-1 bg-emerald-500">Basic</span>
                                ) : null}
                                {permission === 2 ? (
                                    <span className="text-xs Pretendard-Bold text-white ml-2 rounded-lg p-1 bg-blue-500">Pro</span>
                                ) : null}
                                {permission === 9 ? (
                                    <span className="text-xs Pretendard-Bold text-white ml-2 rounded-lg p-1 bg-slate-950">Admin</span>
                                ) : null}

                                <span className="ml-2">{session.user.name}</span>

                            </button>
                        ) : (
                            <Link href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">로그인</Link>
                        )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}