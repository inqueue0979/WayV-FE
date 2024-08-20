"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

// 로딩 컴포넌트를 따로 작성
function Loading() {
    return <div className="mt-10"><h2 className="text-xl font-bold mb-4">Loading...</h2></div>;
}

function HomeContent() {
    const [responseData, setResponseData] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태를 저장할 상태
    const params = useSearchParams();

    useEffect(() => {
        const value_url = params.get('url'); // URL 파라미터에서 'url' 값을 가져옴

        if (value_url) {
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
        }
    }, [params]);

    if (loading) return <Loading />;

    return (
        responseData && (
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Fetched Data:</h2>
                <pre className="bg-gray-100 p-4 rounded-lg">
                    {JSON.stringify(responseData, null, 2)}
                </pre>
            </div>
        )
    );
}

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <main className="mt-20">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input id="Link" placeholder="링크 입력" />
                    <Button type="submit">제출</Button>
                </div>
                <HomeContent />
            </main>
        </Suspense>
    );
}