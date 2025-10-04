// components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  dict: Awaited<ReturnType<typeof import('@/lib/i18n').getDictionary>>
}

type FooterContent = {
  tagline: string
  contact: string
  address1: string
  address2: string
  phone: string
  email: string
  links: string
  home: string
  yachts: string
  business: string
  contactLink: string
  follow: string
  rights: string
}

export default function Footer({ locale, dict }: Props) {
  const f = (dict as { footer: FooterContent }).footer

  const withLocale = (path: string) => `/${locale}${path}`

  return (
    <footer className="bg-[#4d4d4f] text-[#e0e0e0] text-sm">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center text-center gap-10 lg:flex-row lg:flex-wrap lg:justify-center">
        {/* Logo / Company Info */}
        <div className="max-w-xs">
          <Link href={`/${locale}`}>
            <Image
              src="/BAZ_logo.svg"
              alt="BAZ Logo"
              width={180}
              height={60}
              className="mx-auto mb-4"
            />
          </Link>
          <p className="text-[11px] font-light">{f.tagline}</p>
        </div>

        {/* Contact Info */}
        <div className="max-w-xs">
          <h3 className="text-[12px] font-semibold mb-2">{f.contact}</h3>
          <p className="font-light">{f.address1}</p>
          <p className="font-light">{f.address2}</p>
          <p className="font-light mt-2">{f.phone}</p>
          <p className="font-light">{f.email}</p>
        </div>

        {/* Navigation */}
        <div className="max-w-xs">
          <h3 className="text-[16px] font-semibold mb-2">{f.links}</h3>
          <ul className="space-y-1">
            <li>
              <Link href={withLocale('/')} className="hover:underline">
                {f.home}
              </Link>
            </li>
            <li>
              <Link href={withLocale('/yachts')} className="hover:underline">
                {f.yachts}
              </Link>
            </li>
            <li>
              <Link href={withLocale('/business-solutions')} className="hover:underline">
                {f.business}
              </Link>
            </li>
            <li>
              <Link href={withLocale('/contact')} className="hover:underline">
                {f.contactLink}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="max-w-xs">
          <h3 className="text-[16px] font-semibold mb-2">{f.follow}</h3>
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="https://www.instagram.com/baz_pf.construction_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-8 h-8" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#cccccc] text-center py-4 text-[13px]">
        &copy; {new Date().getFullYear()} BAZ Pillows and Fabrics Constructions. {f.rights}
      </div>
    </footer>
  )
}
