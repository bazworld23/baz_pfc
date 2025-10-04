import ProductPage from '..//components/ProductPage'
import { getDictionary, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: Locale }> }  // 👈 params is a Promise

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
  const base = 'https://example.com'

  return {
    title: locale === 'en' ? 'Luxury Pillows for Sofas' : 'Μαξιλάρια Καναπέ',
    description:
      locale === 'en'
        ? 'Custom sofa cushions in any size, material, and fabric for comfort and durability.'
        : 'Κατασκευή μαξιλαριών καναπέ σε οποιοδήποτε μέγεθος, με επιλογές υλικών και υφασμάτων.',
    alternates: {
      languages: {
        en: `${base}/en/sofa`,
        el: `${base}/el/sofa`,
      },
      canonical: `${base}/${locale}/sofa`,
    },
    openGraph: {
      title: locale === 'en' ? 'Luxury Pillows for Sofas' : 'Μαξιλάρια Καναπέ',
      url: `${base}/${locale}/sofa`,
    },
  }
}

export default async function SofaPage({ params }: Props) {
  const { locale } = await params   // 👈 await it
  const dict = await getDictionary(locale)
  const c = (dict as { sofa: ProductSection }).sofa

  return (
    <ProductPage
      title={c.title}
      description={c.description}
      bullets={c.bullets}
      images={[
        { src: '/services/sofa/sofa-1.jpg', alt: locale === 'en' ? 'Main sofa' : 'Κύριος καναπές' },
        { src: '/services/sofa/sofa-2.jpg', alt: locale === 'en' ? 'Sofa' : 'Καναπές' },
        { src: '/services/sofa/sofa-3.jpg', alt: locale === 'en' ? 'Sofa' : 'Καναπές' },
      ]}
    />
  )
}
