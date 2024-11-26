import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

  export function User_Profile_Dropdown() {

    const { data: session } = useSession(); //세션 정보를 가져옴

    // 세션에서 토큰 개수를 가져옴
    const token = session?.user.token;


    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
              className="flex items-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 p-0"
          >
              <img
                  src={session.user.image}
                  alt="Google 프로필 사진"
                  className="w-6 h-6 rounded-full"
              />

              <span className="ml-2 Pretendard-Bold">{session.user.name}</span>

              <span className="text-sm Pretendard-Bold text-white ml-5 rounded-lg p-1 px-5 py-1 bg-black flex items-center">
                  <img src="token.png" alt="토큰 수" className="w-4 h-4 mr-2" />
                  {token}
              </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none Pretendard-Bold ">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
              내 프로필
            </DropdownMenuItem>
            <DropdownMenuItem>
              크레딧 관리
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              설정
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem className="text-red-500" onClick={() => signOut({ callbackUrl: '/' })}>
              로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }