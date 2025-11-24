import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#245EDC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Mahmudul Ahsan - Software Engineer",
    template: "%s | Mahmudul Ahsan",
  },
  description: "Explore the portfolio of Mahmudul Ahsan, a passionate Software Engineer specializing in Full Stack Development, React, Next.js, and modern web technologies. Experience a nostalgic Windows XP themed interface.",
  keywords: [
    "Mahmudul Ahsan",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Windows XP Theme",
    "Web Developer",
    "Frontend Engineer",
    "Bangladesh",
  ],
  authors: [{ name: "Mahmudul Ahsan", url: "https://mahmudulahsan.com" }],
  creator: "Mahmudul Ahsan",
  publisher: "Mahmudul Ahsan",
  metadataBase: new URL("https://mahmudulahsan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mahmudul Ahsan - Software Engineer",
    description: "Explore the portfolio of Mahmudul Ahsan, a passionate Software Engineer specializing in Full Stack Development. Experience a nostalgic Windows XP themed interface.",
    url: "https://mahmudulahsan.com",
    siteName: "Mahmudul Ahsan Portfolio",
    images: [
      {
        url: "/og-image.png", // Assuming we might have or will create this, or use a default
        width: 1200,
        height: 630,
        alt: "Mahmudul Ahsan Portfolio - Windows XP Theme",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmudul Ahsan - Software Engineer",
    description: "Explore the portfolio of Mahmudul Ahsan, a passionate Software Engineer specializing in Full Stack Development. Experience a nostalgic Windows XP themed interface.",
    creator: "@mahmudulahsan", // Placeholder, update if known or remove
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/mycomputer.ico',
    shortcut: '/mycomputer.ico',
    apple: '/apple-touch-icon.png', // Standard practice
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
