import type { ReactNode } from "react";
import "@/app/globals.css"; // ✅ Make sure this is imported!

export const metadata = {
  title: "Audiantix", // Updated to reflect your brand name
  description: "The world's first listening engine that discovers creators talking about travel experiences you can package, sell, and launch.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

