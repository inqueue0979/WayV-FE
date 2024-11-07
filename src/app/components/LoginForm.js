import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <Card className="mx-auto w-[22rem]">
      <CardHeader>
        <CardTitle className="text-2xl Pretendard-Bold">로그인</CardTitle>
        <CardDescription>
            웹브릿지에 오신 것을 환영합니다!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">비밀번호</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
            <hr className="border-gray-300" />
          <Button variant="outline" className="w-full">
            <img src="Google.png" className=" w-6 h-6 mr-2" onClick={() => signIn('google', { callbackUrl: '/' })}></img>Google 계정으로 로그인
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          계정이 존재하지 않나요?{" "}
          <Link href="#" className="underline">
          <p>현재 베타 버전에서는 구글 로그인만 가능합니다.<br />
          이메일 로그인은 추후 업데이트 예정입니다.</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}