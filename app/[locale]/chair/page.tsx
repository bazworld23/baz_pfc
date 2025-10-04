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
    locale === 'en' ? 'Luxury Pillows for Chairs' : 'Μαξιλάρια Καρέκλας'
  const description =
    locale === 'en'
      ? 'We manufacture or refresh chair cushions for indoor and outdoor spaces, combining comfort, durability, and aesthetics tailored to your style.'
      : 'Κατασκευάζουμε ή ανανεώνουμε μαξιλάρια καρέκλας για εσωτερικούς και εξωτερικούς χώρους, με άνεση, αντοχή και αισθητική προσαρμοσμένη στο στυλ σας.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/chair`,
        el: `${base}/el/chair`,
      },
      canonical: `${base}/${locale}/chair`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/chair`,
    },
  }
}

export default async function ChairPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = (dict as { chair: ProductSection }).chair

  return (
    <ProductPage
      title={c.title}
      description={c.description}
      bullets={c.bullets}
      images={[
        { src: '/services/chair/chair-1.jpg', alt: locale === 'en' ? 'Main chair' : 'Κύρια καρέκλα' },
        { src: '/services/chair/chair-2.jpg', alt: locale === 'en' ? 'Chair' : 'Καρέκλα' },
        { src: '/services/chair/chair-3.jpg', alt: locale === 'en' ? 'Chair' : 'Καρέκλα' },
      ]}
    />
  )
}
