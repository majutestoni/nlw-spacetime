import { EmptyMemories } from "@/components/empty-memories";
import { cookies } from "next/headers";
import { api } from "./lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";

export default async function Home() {
  const isAuthenticate = cookies().has("token");

  if (!isAuthenticate) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <EmptyMemories />
      </div>
    );
  }
  const token = cookies().get("token")?.value;

  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
console.log(response.data)
  const memories: Memory[] = response.data;

  if (memories.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <EmptyMemories />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 p-8 ">
      {memories.map((m) => {
        return (
          <div key={m.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50 ">
              {dayjs(m.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={m.coverUrl}
              width={592}
              height={280}
              alt=""
              className="w-full aspect-video object-cover rounded-lg"
            />
            <p className="text-lg leading-relaxed text-gray-100">{m.excerpt}</p>
            <Link href={`/memories/${m.id}`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-200">Ler mais
            <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;

  createdAt: string;
}
