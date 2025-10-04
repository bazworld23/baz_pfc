'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function HeroSectionClient({
  imgSrc,
  imgAlt,
  titleTop,
  titleBottom,
  description,
}: {
  imgSrc: string
  imgAlt: string
  titleTop: string
  titleBottom: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1])   // slight zoom out
  const yText = useTransform(scrollYProgress, [0, 1], [0, -12])     // gentle lift

  return (
    <section
      ref={ref}
      className="relative w-full h-[70vh] md:h-[600px] border-b border-[#4d4d4f] bg-[#e0e0e0] overflow-hidden"
    >
      {/* Background image with subtle parallax */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Soft gradient wash for extra contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/10" />

      {/* Content layer */}
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-12">
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={[
            // MOBILE/TABLET: glass card, top-center
            'absolute left-1/2 -translate-x-1/2 top-6 sm:top-8',
            'w-[min(92vw,680px)] text-center',
            'bg-transparent backdrop-blur-md backdrop-saturate-150',
            'border border-0',
            'shadow-[0_20px_50px_rgba(0,0,0,0.25)]',
            'rounded-2xl px-5 sm:px-8 py-6 sm:py-8',

            // DESKTOP (lg+): revert to original approach — left aligned, no glass
            'lg:static lg:translate-x-0 lg:left-auto lg:top-auto',
            'lg:w-auto lg:max-w-[600px] lg:text-left',
            'lg:bg-transparent lg:backdrop-blur-0 lg:backdrop-saturate-100',
            'lg:border-0 lg:shadow-none',
            'lg:px-0 lg:py-0',
          ].join(' ')}
          aria-label="Hero content"
        >
          <h1 className="font-light leading-tight text-[#4d4d4f] text-[clamp(28px,6vw,48px)]">
            <span className="block">{titleTop}</span>
            <span className="block">{titleBottom}</span>
          </h1>

          <p className="mt-3 sm:mt-4 lg:mt-4 max-w-[44ch] lg:max-w-none text-[#4d4d4f] font-extralight text-[clamp(16px,3.6vw,20px)]">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
