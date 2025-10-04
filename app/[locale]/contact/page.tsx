import { getDictionary, type Locale, locales } from '@/lib/i18n'
import ContactPageClient from '../components/ContactPageClient'

type Props = { params: Promise<{ locale: Locale }> }

type ContactContent = {
  title: string
  intro: string
  address: string
  email: string
  phone: string
  website: string
  instagram: string
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = (dict as { contact: ContactContent }).contact

  // pass only the data needed to the client component
  return <ContactPageClient content={c} />
}
