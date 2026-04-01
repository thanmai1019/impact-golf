import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // We import our new Navbar here!

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ImpactGolf - Charity Subscription Platform',
  description: 'Play golf, enter draws, and support charities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Navbar will now appear at the top of EVERY page */}
        <Navbar />
        
        {/* Added pt-20 here so the fixed navbar doesn't cover your content! */}
        <main className="pt-20"> 
          {children}
        </main>
      </body>
    </html>
  );
}