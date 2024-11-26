import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import Image from "next/image";

export default function Project_Card({ Title, Description }) {
    return (
        <div>
            <Card>
            <CardHeader>
                <Image src="/wayv.png" alt="Project Image" width={24} height={24} /> 
                <CardTitle className="text-xl">{Title}</CardTitle>
                <CardDescription>{Description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
        </div>
    );
}