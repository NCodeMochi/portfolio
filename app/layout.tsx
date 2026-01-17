import type { Metadata } from "next";
import { Nunito, Nunito_Sans, Doto } from "next/font/google";
import { ThemeProvider } from "next-themes"; // You may need to run: npm install next-themes

import "./globals.css";

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
    // suppressHydrationWarning is required for next-themes to work without errors
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${nunitoSans.variable} ${nunitoMono.variable} antialiased transition-colors duration-300`}>
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