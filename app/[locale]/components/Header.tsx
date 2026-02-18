'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  dict: Awaited<ReturnType<typeof import('@/lib/i18n').getDictionary>>
}

const NAV = {
  en: {
    main: ['Pillows', 'Yachts', 'Solutions for Business', 'Projects', 'Contact'],
    sub: ['Sunbeds', 'Sofa', 'Chair'],
    slugs: {
      // slugs WITHOUT locale prefix
      Pillows: '/pillows',
      Yachts: '/yachts',
      Projects: '/projects',
      'Solutions for Business': '/business-solutions',
      Contact: '/contact',
    },
    subSlugs: { Sunbeds: '/sun-bed', Sofa: '/sofa', Chair: '/chair' },
  },
  el: {
    main: ['Μαξιλάρια', 'Σκάφη', 'Λύσεις για Επιχειρήσεις', 'Projects', 'Επικοινωνία'],
    sub: ['Ξαπλώστρες', 'Καναπές', 'Καρέκλα'],
    slugs: {
      'Μαξιλάρια': '/pillows',
      'Σκάφη': '/yachts',
      'Projects': '/projects',
      'Λύσεις για Επιχειρήσεις': '/business-solutions',
      'Επικοινωνία': '/contact',
    },
    subSlugs: { 'Ξαπλώστρες': '/sun-bed', 'Καναπές': '/sofa', 'Καρέκλα': '/chair' },
  },
} as const

export default function Header({ locale, dict }: Props) {

  // dict never used - do comething dummy
  console.log(dict)

  const [openSubNav, setOpenSubNav] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() // includes locale prefix: /en/sofa

  const isPillows = (item: string) => item === 'Pillows' || item === 'Μαξιλάρια'
  const t = NAV[locale]

  // helper: prefix a path with current locale
  const withLocale = (path: string) => `/${locale}${path}`

  // switch to the same path under the other locale
  const switchLocaleHref = (target: Locale) => {
    if (!pathname) return `/${target}`
    const parts = pathname.split('/')
    parts[1] = target // replace locale segment
    return parts.join('/') || `/${target}`
  }

  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
    setOpenSubNav(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenSubNav(null)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenSubNav(null)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="bg-[#f3f3f3] border-b border-[#4d4d4f] w-full font-commissioner relative z-50">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Logo & Burger */}
        <div className="flex-1 flex items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}>
            <Image
              src="/BAZ_logo.svg"
              alt={'Pillows & Fabric Co.'}
              width={300}
              height={100}
              className="object-contain"
              priority
            />
          </Link>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} className="text-[#4d4d4f]" /> : <Menu size={28} className="text-[#4d4d4f]" />}
          </button>
        </div>

        {/* Right side: Language & Navigation */}
        <div className="flex-2 flex flex-col justify-between px-6 pb-4 lg:py-1 lg:pr-20">
          {/* Language Switcher -> real links to same page in other locale */}
          <div className="flex justify-end mt-5 text-[24px] text-[#4d4d4f]">
            <div className="flex space-x-2 font-extralight italic">
              <Link
                href={switchLocaleHref('en')}
                className={`cursor-pointer transition-colors duration-200 ${locale === 'en' ? 'text-black' : 'text-gray-400'}`}
              >
                ENG
              </Link>
              <Link
                href={switchLocaleHref('el')}
                className={`cursor-pointer transition-colors duration-200 ${locale === 'el' ? 'text-black' : 'text-gray-400'}`}
              >
                EL
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden lg:flex justify-end mt-2 mb-2 text-[24px] font-light text-[#4d4d4f]">
            <div className="flex space-x-10">
              {t.main.map((item) => {
                const target = t.slugs[item as keyof typeof t.slugs] ?? '/'
                const isActive = pathname === withLocale(target)
                return (
                  <div key={item} className="relative">
                    {isPillows(item) ? (
                      <button
                        onClick={() => setOpenSubNav(openSubNav === item ? null : item)}
                        className={`relative transition-colors duration-200 cursor-pointer ${
                          openSubNav === item ? 'text-black' : 'hover:text-black'
                        }`}
                      >
                        {item}
                        <span
                          className={`absolute left-0 -bottom-1 h-[1px] w-full origin-left transform bg-black transition-transform duration-300 ${
                            openSubNav === item ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={withLocale(target)}
                        className={`relative transition-colors duration-200 ${isActive ? 'text-black' : 'hover:text-black'}`}
                      >
                        {item}
                        <span
                          className={`absolute left-0 -bottom-1 h-[1px] w-full origin-left transform bg-black transition-transform duration-300 ${
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </Link>
                    )}

                    {isPillows(item) && openSubNav === item && (
                      <div className="absolute top-full mt-2 bg-white shadow-md border border-[#4d4d4f] py-5 px-4 space-y-1 z-50 min-w-max">
                        {t.sub.map((sub) => (
                          <Link
                            key={sub}
                            href={withLocale(t.subSlugs[sub as keyof typeof t.subSlugs])}
                            onClick={() => setOpenSubNav(null)}
                            className="block text-[20px] text-[#4d4d4f] hover:text-black"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="flex flex-col gap-4 mt-4 text-[22px] font-light text-[#4d4d4f] lg:hidden">
              {t.main.map((item) => {
                const target = t.slugs[item as keyof typeof t.slugs] ?? '/'
                return (
                  <div key={item}>
                    {isPillows(item) ? (
                      <>
                        <div className="text-left w-full text-black font-medium">{item}</div>
                        <div className="ml-4 mt-2 flex flex-col gap-2">
                          {t.sub.map((sub) => (
                            <Link key={sub} href={withLocale(t.subSlugs[sub as keyof typeof t.subSlugs])} className="text-left text-[18px] text-[#4d4d4f] hover:text-black">
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link href={withLocale(target)} className="text-left w-full hover:text-black">
                        {item}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
