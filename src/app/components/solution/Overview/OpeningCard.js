'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OpeningCard(props) {
    return (
        <Card className="rounded-3xl">
            <CardHeader>
                <CardTitle className="text-md">{props.Title}</CardTitle>
                <CardDescription className="text-sm">{props.Description}</CardDescription>
            </CardHeader>
            <CardContent className="text-4xl Pretendard-Bold">
                <p>{props.Content}</p>
            </CardContent>
            <CardFooter className="text-gray-400 text-sm">
                <p>{props.Footer}</p>
            </CardFooter>
        </Card>
    );
}
