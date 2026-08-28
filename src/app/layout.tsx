import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { myCustomFont } from "./fonts/fonts";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Auntie-D Herbs",
  description: "Shop thoughtfully prepared herbal wellness products from Auntie-D Herbs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        myCustomFont.variable,
      )}
    >
      <body className={cn("min-h-full flex flex-col", inter.className)}>{children}</body>
    </html>
  );
}
