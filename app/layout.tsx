import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import ClientComponent from "./ClientComponent";

const font = Sora({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Olivia Portofolio",
  description: "Website portofolio with TypeScript and Next js",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  );
}
