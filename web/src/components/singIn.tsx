import { User } from "lucide-react";

export function SingIn() {
  return (
    <>
      <div className="absolute right-0 top-1/2 h-[288px] w-[528px] bg-purple-700  opacity-50 -translate-y-1/2 translate-x-1/2 rounded blur-full"></div>
      <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes "></div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        className="flex items-center  gap-3  text-left hover:text-gray-50 transition-colors"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <p className="text-sm leading-snug max-w-[140px]">
          <span className="underline"> Crie sua conta </span> e salve suas memórias!
        </p>
      </a>
    </>
  );
}
