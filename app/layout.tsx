import type { Metadata } from "next";
import { Nunito, Nunito_Sans, Doto, Forum, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";

// Existing Fonts
const nunitoSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

const nunitoMono = Nunito_Sans({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const doto = Doto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-doto",
});

// New Wood Art Fonts
const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-forum",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Neil.dev | Portfolio",
  description:
    "Professional web developer portfolio highlighting web apps, mobile applications, and modern UI/UX design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`
          ${nunitoSans.variable} 
          ${nunitoMono.variable} 
          ${doto.variable} 
          ${forum.variable} 
          ${inter.variable} 
          antialiased transition-colors duration-300
        `}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}