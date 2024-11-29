"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetails(props) {
    return (
      <section className="min-h-screen max-w-screen-xl mt-28 mx-auto p-3">
        <p className=" text-lg">{props.params.ProjectID} 프로젝트</p>
        <h1 className=" text-3xl mb-2">접근성 검사</h1>

        <Tabs defaultValue='summary'>

          <TabsList className="">
            <TabsTrigger value="summary" className="cursor-pointer">둘러보기</TabsTrigger>
            <TabsTrigger value="inspect" className="cursor-pointer">접근성 검사</TabsTrigger>
            <TabsTrigger value="payment" className="cursor-pointer">예산</TabsTrigger>
            <TabsTrigger value="settings" className="cursor-pointer">프로젝트 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">

            <div className="grid grid-cols-3 gap-x-4">
              
              <div className="rounded-3xl bg-white p-4 border">
                <h3 className="text-lg font-semibold mb-2">접근성 준수 비율</h3>
                <p>87%</p>
                <p className="text-sm">* 80% 이상 목표</p>
              </div>

              <div className="rounded-3xl bg-white p-4 border">
                <h3 className="text-lg font-semibold mb-2">최근의 접근성 준수 비율</h3>
                <p>+ 5%p</p>
                <p className="text-sm">* Refresh Rate - 1h</p>
              </div>

              <div className="rounded-3xl bg-white p-4 border">
                <h3 className="text-lg font-semibold mb-2">WEBridge 총 사용량</h3>
                <p>182회</p>
                <p className="text-sm">* 프로젝트 시작 2024. 11. 01 ~</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inspect">
            <Button className="mr-2">무료 접근성 검사 진행하기</Button> <Button className=" bg-emerald-700">유료 접근성 검사 진행하기</Button>
          </TabsContent>
        </Tabs>


        
      </section>
    );
  }