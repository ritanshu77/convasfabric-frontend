import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ChetBotPage from "./ChetBotPage";
import Navbar from "./Navbar";
import Cartificate from "./Cartificate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <Cartificate />
    {/* <Navbar />
    <ChetBotPage /> */}
    </>
  );
}
