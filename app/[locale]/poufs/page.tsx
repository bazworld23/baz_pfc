import Image from 'next/image'
import type { Metadata } from 'next'
import { getDictionary, type Locale, locales } from '@/lib/i18n'

type Props = { params: Promise<{ locale: Locale }> }

type PoufItem = {
  key: string
  name: string
  dimension?: string
}

type PoufsSection = {
  title: string
  intro: string
  categories: string[]
  items: PoufItem[]
}

type PoufSection = {
  title: string
  itemKeys: string[]
}

const imageByKey: Record<string, string> = {
  foxy: '/services/poufs-page/foxy.png',
  dori: '/services/poufs-page/DORI.png',
  ciao: '/services/poufs-page/CIAO.png',
  eve: '/services/poufs-page/EVE.png',
  eveLong: '/services/poufs-page/EVE.png',
  bigFoxy: '/services/poufs-page/bigfoxy.png',
  mediterraneo: '/services/poufs-page/MEDITERANEO.png',
  cloud: '/services/poufs-page/CLOUDE.png',
  ocean: '/services/poufs-page/OCEAN.png',
  stuzi: '/services/poufs-page/STUZI.png',
  mare: '/services/poufs-page/MARE.png',
  cube: '/services/poufs-page/cube.png',
  bellino: '/services/poufs-page/BELLINO.png',
  bigBoy: '/services/poufs-page/BIGBOY.png',
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const base = 'https://example.com'

  const title = locale === 'en' ? 'Poufs' : 'Πουφ'
  const description =
    locale === 'en'
      ? 'All poufs can be produced for indoor or outdoor use with your choice of fabrics and tailored solutions.'
      : 'Όλα τα πουφ μπορούν να κατασκευαστούν με προδιαγραφές για εσωτερικό ή εξωτερικό χώρο, με υφάσματα της επιλογής σας και εξατομικευμένες λύσεις.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `${base}/en/poufs`,
        el: `${base}/el/poufs`,
      },
      canonical: `${base}/${locale}/poufs`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/poufs`,
    },
  }
}

export default async function PoufsPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const p = (dict as { poufs: PoufsSection }).poufs

  const sections: PoufSection[] = [
    { title: p.categories[0], itemKeys: ['foxy', 'dori', 'ciao', 'eve', 'bellino', 'bigBoy'] },
    { title: p.categories[1], itemKeys: ['bigFoxy', 'mediterraneo', 'eveLong', 'cloud', 'ocean', 'stuzi'] },
    { title: p.categories[2], itemKeys: ['mare', 'cube'] },
  ]

  const itemMap = new Map(p.items.map((item) => [item.key, item]))

  return (
    <section className="bg-[#e0e0e0] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-[44px] leading-none font-light text-[#4d4d4f] mb-6">{p.title}</h1>
          <p className="text-[30px] leading-[1.2] font-extralight text-[#4d4d4f] max-w-4xl">{p.intro}</p>
        </header>

        <div className="space-y-16">
          {sections.map((section) => {
            const items = section.itemKeys
              .map((key) => itemMap.get(key))
              .filter((item): item is PoufItem => Boolean(item))

            return (
              <section key={section.title}>
                <h2 className="inline-block text-[36px] leading-none font-light text-[#4d4d4f] border-b border-[#4d4d4f] mb-8 pb-1">
                  {section.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  {items.map((item) => (
                    <article key={item.key}>
                      <div className="relative w-full h-[320px]">
                        <Image
                          src={imageByKey[item.key]}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="mt-2 text-[#4d4d4f]">
                        <h3 className="text-[28px] leading-none font-light">{item.name}</h3>
                        {item.dimension ? (
                          <p className="mt-1 text-[18px] leading-none font-light">{item.dimension}</p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
