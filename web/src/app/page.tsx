import { User } from "lucide-react";
import { Hero } from "@/components/hero";
import { EmptyMemories } from "@/components/empty-memories";
import { cookies } from "next/headers";
import { SingIn } from "@/components/singIn";
import { Profile } from "@/components/profile";

export default function Home() {
  const isAuthenticate = cookies().has("token");
  return (
    <main className="grid grid-cols-2 min-h-screen bg-[url(../assets/bg-starts.svg)] bg-cover">
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 ">
        {isAuthenticate ? <Profile /> : <SingIn />}
        <Hero />
      </div>
      <EmptyMemories />
    </main>
  );
}
