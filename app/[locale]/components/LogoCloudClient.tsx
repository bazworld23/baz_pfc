'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LogoCloudClient({
  title,
  logos,
}: {
  title: string
  logos: { file: string; alt: string }[]
}) {
  return (
    <section className="bg-[#b8b6b6] py-12">
      <div className="px-8">
        <h2 className="text-[32px] font-light text-[#4d4d4f] mb-8">{title}</h2>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.file}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.05 }}
              className="flex justify-center w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <div className="group relative w-[240px] md:w-[280px] h-[120px] md:h-[150px]">
                <Image
                  src={`/clients/${logo.file}`}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-[0.98]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
