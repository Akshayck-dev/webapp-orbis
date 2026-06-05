import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import ClientLayoutRenderer from "@/components/ClientLayoutRenderer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebApp Orbis | We Build Digital Solutions",
  description: "Professional digital solutions company specialising in website designing, mobile app development, and customised ERP software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-[#FCFCFC] text-[#17204E] selection:bg-[#057AF8] selection:text-[#17204E]`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <ClientLayoutRenderer>
            {children}
          </ClientLayoutRenderer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
