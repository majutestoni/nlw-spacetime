import "./globals.css";
import { Roboto_Flex as Roboto, Bai_Jamjuree as BainJ } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], variable: '--font-roboto' });
const bainJ = BainJ({ subsets: ["latin"], weight: ["700"], variable: '--font-bain' });

export const metadata = {
  title: "NLW space time",
  description: "Uma capsula do tempo com Next",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bainJ.variable} font-sans bg-gray-900 text-gray-100`}>{children}</body>
    </html>
  );
}
