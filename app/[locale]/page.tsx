import HeroSectionClient from './components/HeroSectionClient'
import LogoCloudClient from './components/LogoCloudClient'
import type { Metadata } from 'next'
import { getDictionary, type Locale, locales } from '@/lib/i18n'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const base = 'https://example.com' // <-- set your domain

  const title = locale === 'en'
    ? 'BAZ Pillows & Fabrics — Custom cushions and upholstery'
    : 'BAZ Μαξιλάρια & Υφάσματα — Custom κατασκευές και επενδύσεις'

  const description = locale === 'en'
    ? 'Custom cushions, furniture repair, and bespoke furniture builds for residential and professional spaces.'
    : 'Custom μαξιλάρια, επισκευές επίπλων και ειδικές κατασκευές για οικιακούς και επαγγελματικούς χώρους.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en`,
        el: `${base}/el`,
      },
      canonical: `${base}/${locale}`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}`,
    },
  }
}

type HomeContent = {
  heroTop: string
  heroBottom: string
  heroDesc: string
  heroAlt: string
  clientsTitle: string
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const h = (dict as { home: HomeContent }).home

  const clients = [
    { file: 'coffee-lab.png', alt: 'Coffee Lab' },
    { file: 'cocomat.svg',    alt: 'COCO-MAT' },
    { file: 'natuzzi.svg',    alt: 'Natuzzi' },
    { file: 'kastelorizo.png',alt: 'Kastelorizo' },
  ]

  return (
    <main className="font-commissioner">
      <HeroSectionClient
        imgSrc="/arxiki.jpg"
        imgAlt={h.heroAlt}
        titleTop={h.heroTop}
        titleBottom={h.heroBottom}
        description={h.heroDesc}
      />

      <LogoCloudClient title={h.clientsTitle} logos={clients} />
    </main>
  )
}