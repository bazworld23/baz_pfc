// components/ProductPage.tsx (server)
import Image from 'next/image'
import Reveal from './Reveal'

interface ProductPageProps {
  title: string
  description: string
  bullets: string[]
  images: { src: string; alt?: string }[]
}

export default function ProductPage({ title, description, bullets, images }: ProductPageProps) {
  const [firstImage, ...otherImages] = images

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 bg-[#e0e0e0]">
      {/* First row: text + first image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text block */}
        <Reveal>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-light text-[#4d4d4f] mb-4">{title}</h1>
            <p className="text-[18px] text-[#4d4d4f] font-extralight mb-4">{description}</p>
            <ul className="list-disc list-inside space-y-2 text-[#4d4d4f] text-[16px] font-light max-w-md mx-auto lg:mx-0 text-left">
              {bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* First image */}
        {firstImage && (
          <Reveal delay={0.05}>
            <div className="w-full flex justify-center">
              <div className="group relative w-full max-w-[600px] h-[400px]">
                <Image
                  src={firstImage.src}
                  alt={firstImage.alt || 'Product image'}
                  fill
                  className="object-cover rounded-md shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Remaining images: 2 per row */}
      {otherImages.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {otherImages.map((image, idx) => (
            <Reveal key={idx} delay={0.05 + idx * 0.05} className="w-full sm:w-[calc(50%-1rem)] flex justify-center">
              <div className="group relative w-full max-w-[500px] h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt || `Product image ${idx + 2}`}
                  fill
                  className="rounded-md shadow-md object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
