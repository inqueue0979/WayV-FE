import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import Image from "next/image";
import Link from "next/link";

export default function Project_Card({ Title, project_id, Description }) {
    return (
        <div>
            <Card>
            <CardHeader>
                <Image src="/wayv.png" alt="Project Image" width={24} height={24} /> 
                <CardTitle className="text-xl Pretendard-Bold">{Title}</CardTitle>
                <CardDescription>{project_id}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={"/project/"+project_id}><Button>프로젝트 보기</Button></Link>
            </CardContent>
        </Card>
        </div>
    );
}