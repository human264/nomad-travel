import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ScanlineOverlay from '@/components/ui/ScanlineOverlay';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOMAD.TRAVEL — 디지털 노마드 도시 탐색 플랫폼',
  description: '한국 디지털 노마드를 위한 도시 정보 플랫폼. 생활비, 날씨, 비자, 코워킹 스페이스를 한눈에 비교하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={jetbrainsMono.variable}>
      <body className="min-h-screen bg-[#0a0a0f] text-[#e2e8f0] font-mono antialiased">
        <ScanlineOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
