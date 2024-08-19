import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Home() {
  return (
    <main>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input id="Link" placeholder="링크 입력" />
            <Button type="submit">제출</Button>
        </div>
    </main>
  );
}
