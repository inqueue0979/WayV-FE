// src/app/solution/page.js
'use client';

import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardContainer from './CardContainer'; // 클라이언트 컴포넌트로 분리
import OpeningCard from '../components/solution/Overview/OpeningCard';

export default function Home({ searchParams }) {
    const value_url = searchParams?.url || ""; // URL 파라미터를 서버에서 읽어 클라이언트 컴포넌트로 전달
  
    return (
      <main className="m-8 mt-20 border p-8 rounded-lg">
        <p className="Pretendard-Bold">{value_url}</p>
        <h1 className="Pretendard-Bold text-2xl mb-4 ">접근성 검사 리포트 <strong className="Pretendard-Regular text-sm">Beta</strong></h1>
        
        <Tabs defaultValue='summary'>
          <TabsList className="">
          <TabsTrigger value="summary" className="cursor-pointer">요약</TabsTrigger>
          <TabsTrigger value="details" className="cursor-pointer">상세</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className="grid grid-cols-3 gap-x-4">
              <OpeningCard Title="접근성 준수 비율" Description="프로젝트 내의 코드들의 총 접근성 비율" Content="제공 예정" Footer="* 80% 이상 목표" />
              <OpeningCard Title="최근의 접근성 준수 비율" Description="3일 내 접근성 비율 상승률" Content="제공 예정" Footer="* Refresh Rate - 1h" />
              <OpeningCard Title="Webridge 총 사용량" Description="프로젝트 시작 시점으로부터 솔루션 사용 총량" Content="제공 예정" Footer="* 프로젝트 시작 2024. 11. 01 ~" />
            </div>
          </TabsContent>
          <TabsContent value="details">
            <Suspense fallback={<p>Loading...</p>}>
              <CardContainer valueUrl={value_url} /> {/* URL을 프롭스로 전달 */}
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    );
  }