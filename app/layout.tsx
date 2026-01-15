import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

const nunitoMono = Nunito_Sans({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neil.dev | Portfolio",
  description:
    "Professional web developer portfolio highlighting web apps, mobile applications, and modern UI/UX design. Browse projects and connect for freelance or contract work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${nunitoMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
