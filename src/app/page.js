import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { NavigationMenuDemo } from "./components/NavigationMenuDemo";

export default function Home() {
  return (
    <main>
      <div className='hidden sm:flex justify-center items-center col-span-6'>
            <NavigationMenuDemo />
        </div>

      <Button>Click me</Button>
    </main>
  );
}
