"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [responseData, setResponseData] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태를 저장할 상태
    const params = useSearchParams();
    let value_url;

    useEffect(() => {
        // URL 파라미터를 콘솔에 출력
        for (const [key, value] of params.entries()) {
            value_url = value;
        }

        // 데이터를 가져오는 비동기 함수
        const fetchData = async () => {
            setLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태를 true로 설정
            try {
                const response = await fetch("https://api.jowonjae.kro.kr/joijui/sites?url=" + value_url); // URL 파라미터로 받은 링크로 데이터 가져오기
                if (response.ok) {
                    const data = await response.json();
                    setResponseData(data); // 가져온 데이터를 상태로 저장
                } else {
                    throw new Error("Data fetching error");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // 데이터 가져오기가 완료되면 로딩 상태를 false로 설정
            }
        };

        fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, [params]);

    return (
        <main className="mt-20">
            {/* 로딩 상태에 따른 화면 표시 */}
            {loading ? (
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Loading...</h2>
                </div>
            ) : (
                responseData && (
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-4">Fetched Data:</h2>
                        <pre className="bg-gray-100 p-4 rounded-lg">
                            {JSON.stringify(responseData, null, 2)}
                        </pre>
                    </div>
                )
            )}
        </main>
    );
}