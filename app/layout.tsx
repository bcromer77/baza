import type { ReactNode } from "react";

export const metadata = {
  title: "Creator Torch",
  description: "Your app description",
};

export default function RootLayout({ children }: { children: ReactNode }) 
{
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
