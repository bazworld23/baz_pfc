import { Commissioner } from 'next/font/google'
import { getDictionary, resolveLocale, type Locale } from '@/lib/i18n';
import { ReactNode } from 'react';
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'



const commissioner = Commissioner({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-commissioner',
})

export const metadata = {
  title: 'Furniture Co.',
  description: 'Modern furniture for modern spaces',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;   // <-- string (NOT Locale)
}) {
  const { locale: raw } = await params;
  const locale: Locale = resolveLocale(raw);   // narrow to your union
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={commissioner.variable}>
      <body className="flex flex-col min-h-screen font-commissioner">
        <Header locale={locale} dict={dict} />
        <main className="flex-1 bg-[#e0e0e0]">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}