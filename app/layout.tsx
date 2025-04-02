import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CreatorTorch",
  description: "Connecting brands with creators through authentic voice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.getphyllo.com/connect/v2/phyllo-connect.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col">
          <div className="flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
