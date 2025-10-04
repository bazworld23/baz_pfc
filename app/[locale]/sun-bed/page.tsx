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

  const title = locale === 'en' ? 'Luxury Sunbeds' : 'Ξαπλώστρες Πολυτελείας'
  const description =
    locale === 'en'
      ? 'We craft and refurbish sunbed cushions in any size and design, using high-durability materials.'
      : 'Προσφέρουμε κατασκευή και επισκευή μαξιλαριών για ξαπλώστρες, σε οποιαδήποτε διάσταση και σχέδιο, με υλικά υψηλής αντοχής.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/sun-bed`,
        el: `${base}/el/sun-bed`,
      },
      canonical: `${base}/${locale}/sun-bed`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/sun-bed`,
    },
  }
}

export default async function SunBedPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = (dict as { sunbed: ProductSection }).sunbed

  return (
    <ProductPage
      title={c.title}
      description={c.description}
      bullets={c.bullets}
      images={[
        { src: '/services/sunbed/sunbed-1.jpg', alt: locale === 'en' ? 'Main sunbed' : 'Κύρια ξαπλώστρα' },
        { src: '/services/sunbed/sunbed-2.jpg', alt: locale === 'en' ? 'Sunbed' : 'Ξαπλώστρα' },
        { src: '/services/sunbed/sunbed-3.jpg', alt: locale === 'en' ? 'Sunbed' : 'Ξαπλώστρα' }
      ]}
    />
  )
}
