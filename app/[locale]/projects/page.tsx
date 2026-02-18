import ProjectsPage from '../components/ProjectsPage'
import { getDictionary, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const base = 'https://example.com'

  const title = locale === 'en' ? 'Projects' : 'Έργα'
  const description = locale === 'en' ? 'Our selected projects and clients' : 'Επιλεγμένα έργα και πελάτες'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/projects`,
        el: `${base}/el/projects`,
      },
      canonical: `${base}/${locale}/projects`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/projects`,
    },
  }
}

export default async function ProjectsIndexPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const p = (dict as { projects: { title: string; description: string; bullets: string[] } }).projects

  return <ProjectsPage />
}
