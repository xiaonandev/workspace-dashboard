import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Workspace Dashboard',
  description: 'Manage workspace bookings, members, and performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body className="min-h-full bg-[#f5f8fa] font-sans text-[#2e3c49]">
        <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[900px]:grid-cols-[76px_minmax(0,1fr)] max-sm:block max-sm:pb-17">
          <Sidebar />
          <div className="min-w-0">
            <Header />
            <main className="px-8 pt-7.5 pb-12 max-sm:px-4.5 max-sm:py-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
