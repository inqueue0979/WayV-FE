import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <Image src="/wayv.png" alt="WayV 로고" width={100} height={100} />
        <p className="Pretendard-Bold text-xl">WayV 4.20</p>
        <div className="mt-8">
          <h1 className="text-2xl m-4 text-center">
            <strong className="Pretendard-Bold">링크 입력 한 번</strong>으로<br />
            <strong className="Pretendard-Bold">웹 접근성</strong>을 확인해 보세요!
          </h1>
        </div>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input id="Link" placeholder="링크 입력" />
          <Button type="submit">제출</Button>
        </div>
        <h1 className="text-xl m-4 text-center">* 아직 작동 안 해요,,</h1>
      </div>
    </main>
  );
}