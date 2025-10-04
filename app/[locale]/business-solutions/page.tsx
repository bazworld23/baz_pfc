import ProductPage from '../components/ProductPage'
import { getDictionary, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: Locale }> }

type ProductSection = {
  title: string
  description: string
  bullets: string[]
  images?: { src: string; alt?: string }[]
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const base = 'https://example.com' // <-- replace with your domain

  const title =
    locale === 'en' ? 'Solutions for Businesses' : 'Λύσεις για Επιχειρήσεις'
  const description =
    locale === 'en'
      ? 'We provide specialized manufacturing and services for professionals and organizations seeking high-quality, tailored solutions in cushions and fabrics. From hospitality to marine, we adapt to the needs of each project.'
      : 'Προσφέρουμε εξειδικευμένες κατασκευές και υπηρεσίες για επαγγελματίες και επιχειρήσεις που αναζητούν ποιοτικές και εξατομικευμένες λύσεις σε μαξιλάρια και υφάσματα. Από τον χώρο της φιλοξενίας έως και τη ναυπηγική, προσαρμοζόμαστε στις ανάγκες του κάθε έργου.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/business-solutions`,
        el: `${base}/el/business-solutions`,
      },
      canonical: `${base}/${locale}/business-solutions`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/business-solutions`,
    },
  }
}

export default async function BusinessPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = (dict as { business: ProductSection }).business

  return (
    <ProductPage
      title={c.title}
      description={c.description}
      bullets={c.bullets}
      images={
        [
          { src: '/services/business/business-1.jpg', alt: locale === 'en' ? 'Business solutions' : 'Λύσεις για επιχειρήσεις' },
        ]
      }
    />
  )
}
