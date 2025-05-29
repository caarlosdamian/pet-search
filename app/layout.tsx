import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Toaster } from 'sonner';

// Inside your RootLayout component, add this before the closing body tag:

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PawFinder - Find Your New Best Friend',
  description:
    'Adopt your perfect pet companion from our selection of loving cats, dogs, and other animals looking for their forever home.',
  keywords:
    'pet adoption, adopt pets, rescue animals, dog adoption, cat adoption',
  openGraph: {
    title: 'PawFinder - Find Your New Best Friend',
    description:
      'Adopt your perfect pet companion from our selection of loving cats, dogs, and other animals looking for their forever home.',
    url: 'https://pawfinder.vercel.app',
    siteName: 'PawFinder',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PawFinder - Pet Adoption Website',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
