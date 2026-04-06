import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata = {
  title: "ReadmeForge — GitHub Profile README Generator",
  description:
    "Create a beautiful GitHub Profile README in seconds. No coding required. Choose from 300+ tech badges, GitHub stats, social links, and more.",
  keywords: ["github profile", "readme generator", "github readme", "profile readme maker"],
  openGraph: {
    title: "ReadmeForge — GitHub Profile README Generator",
    description: "Create a beautiful GitHub Profile README in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
