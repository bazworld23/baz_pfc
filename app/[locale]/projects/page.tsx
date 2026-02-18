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

  // Build sections: intro + gallery (keeps things simple and flexible)
  const sections = [
    {
      title: p.title,
      description: p.description,
      bullets: p.bullets,
      images: [
        { src: '/clients/coffee-lab.png', alt: 'Coffee Lab' },
        { src: '/services/projects/1.jpg', alt: 'Project 1' },
        { src: '/services/projects/2.jpg', alt: 'Project 2' },
      ],
    },
    {
      title: undefined,
      images: [
        { src: '/services/projects/3.jpg', alt: 'Project 3' },
        { src: '/services/projects/4.jpg', alt: 'Project 4' },
        { src: '/services/projects/5.jpg', alt: 'Project 5' },
        { src: '/services/projects/6.jpg', alt: 'Project 6' },
      ],
    },
    {
      title: undefined,
      images: [
        { src: '/services/projects/7.jpg', alt: 'Project 7' },
        { src: '/services/projects/8.jpg', alt: 'Project 8' },
        { src: '/services/projects/9.jpg', alt: 'Project 9' },
        { src: '/services/projects/10.jpg', alt: 'Project 10' },
      ],
    },
    {
      title: undefined,
      images: [
        { src: '/services/projects/11.jpg', alt: 'Project 11' },
        { src: '/services/projects/12.jpg', alt: 'Project 12' },
        { src: '/services/projects/13.jpg', alt: 'Project 13' },
        { src: '/services/projects/14.jpg', alt: 'Project 14' },
      ],
    },
    {
      title: undefined,
      images: [
        { src: '/services/projects/15.jpg', alt: 'Project 15' },
        { src: '/services/projects/16.jpg', alt: 'Project 16' },
        { src: '/services/projects/17.jpg', alt: 'Project 17' },
        { src: '/services/projects/18.jpg', alt: 'Project 18' },
        { src: '/services/projects/19.jpg', alt: 'Project 19' },
      ],
    },
  ]

  return <ProjectsPage />
}
