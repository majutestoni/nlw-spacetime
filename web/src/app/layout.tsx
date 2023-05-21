import { EmptyMemories } from "@/components/empty-memories";
import { Hero } from "@/components/hero";
import { Profile } from "@/components/profile";
import { SingIn } from "@/components/singIn";
import "./globals.css";
import { Roboto_Flex as Roboto, Bai_Jamjuree as BainJ } from "next/font/google";
import { cookies } from "next/headers";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const bainJ = BainJ({ subsets: ["latin"], weight: ["700"], variable: "--font-bain" });

export const metadata = {
  title: "NLW space time",
  description: "Uma capsula do tempo com Next",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticate = cookies().has("token");
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bainJ.variable} font-sans bg-gray-900 text-gray-100`}>

        <main className="grid grid-cols-2 min-h-screen bg-[url(../assets/bg-starts.svg)] bg-cover">
          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 ">
            {isAuthenticate ? <Profile /> : <SingIn />}
            <Hero />
          </div>
          <div className="flex flex-col bg-[url(../assets/bg-starts.svg)] bg-cover overflow-y-scroll max-h-screen">
                {children}
          </div>
        </main>
      </body>
    </html>
  );
}
