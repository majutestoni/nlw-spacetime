import { getUser } from "@/app/lib/auth";
import Image from "next/image";

export function Profile() {
  const { name, avatarUrl } = getUser();
  return (
    <>
      <div className="absolute right-0 top-1/2 h-[288px] w-[528px] bg-purple-700  opacity-50 -translate-y-1/2 translate-x-1/2 rounded blur-full"></div>
      <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes "></div>
      <div className="flex items-center  gap-3  text-left">
        <Image src={avatarUrl} width={40} height={40} alt="" className="w-10 h-10 rounded-full" />
        <p className="text-sm leading-snug max-w-[140px]">{name}</p>
        <a href="" className="block text-red-400 hover:text-red-300">
          Quero sair
        </a>
      </div>
    </>
  );
}
