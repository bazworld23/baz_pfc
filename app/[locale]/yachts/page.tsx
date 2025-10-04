import ProductPage from '../components/ProductPage'
import { getDictionary, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type ProductSection = {
  title: string
  description: string
  bullets: string[]
  images?: { src: string; alt?: string }[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const base = 'https://example.com' // <-- replace with your domain

  const title =
    locale === 'en' ? 'Solutions for Luxury Yachts' : 'Λύσεις για Πολυτελή Σκάφη'
  const description =
    locale === 'en'
      ? 'We specialize in solutions for luxury vessels. We manufacture and refurbish interior and exterior cushions and upholstery using high-spec, premium materials.'
      : 'Η εξειδίκευσή μας είναι οι λύσεις για πολυτελή σκάφη. Προσφέρουμε κατασκευή και ανακατασκευή μαξιλαριών και επενδύσεων εσωτερικού και εξωτερικού χώρου με υλικά υψηλών προδιαγραφών και αισθητικής.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/yachts`,
        el: `${base}/el/yachts`,
      },
      canonical: `${base}/${locale}/yachts`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/yachts`,
    },
  }
}

export default async function YachtsPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = (dict as { yachts: ProductSection }).yachts

  return (
    <ProductPage
      title={c.title}
      description={c.description}
      bullets={c.bullets}
      images={[
        { src: '/services/yachts/yacht-1.jpg', alt: locale === 'en' ? 'Main yacht' : 'Κύριο σκάφος' },
        { src: '/services/yachts/yacht-2.jpg', alt: locale === 'en' ? 'Yacht' : 'Σκάφος' }
      ]}
    />
  )
}
