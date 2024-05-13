import type { Metadata } from "next";
import { outfit } from "@/app/ui/fonts";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Task Board",
  description: "Task Board Created By Meduard Krasniqi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}

        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
