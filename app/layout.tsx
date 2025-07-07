import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/Providers/theme-provider";
import ReduxProvider from "@/store/ReduxProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zappy - Magical Memories for Your Little Ones",
  description:
    "Create unforgettable birthday parties and themed events for kids with professional vendors and curated experiences.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
          <main >{children}</main>
        </ThemeProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
}
