'use client'

import { MapPin, Mail, Phone, Instagram } from 'lucide-react'

type ContactContent = {
  title: string
  intro: string
  address: string
  email: string
  phone: string
  instagram: string
}

export default function ContactPageClient({
  content,
}: {
  content: ContactContent
}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 font-commissioner bg-[#e0e0e0]">
      {/* Intro Text */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-light text-[#4d4d4f] mb-4">{content.title}</h1>
        <p className="text-[18px] text-[#4d4d4f] font-extralight">{content.intro}</p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#f3f3f3] rounded-lg p-6 text-center flex flex-col items-center shadow">
          <MapPin className="w-8 h-8 mb-3 text-[#4d4d4f]" />
          <p className="text-[#4d4d4f] text-[16px] font-light">{content.address}</p>
        </div>

        <div className="bg-[#f3f3f3] rounded-lg p-6 text-center flex flex-col items-center shadow">
          <Mail className="w-8 h-8 mb-3 text-[#4d4d4f]" />
          <a href={`mailto:${content.email}`} className="text-[#4d4d4f] text-[16px] font-light hover:underline">
            {content.email}
          </a>
        </div>

        <div className="bg-[#f3f3f3] rounded-lg p-6 text-center flex flex-col items-center shadow">
          <Phone className="w-8 h-8 mb-3 text-[#4d4d4f]" />
          <a href={`tel:${content.phone.replace(/\s+/g, '')}`} className="text-[#4d4d4f] text-[16px] font-light hover:underline">
            {content.phone}
          </a>
        </div>

        <div className="bg-[#f3f3f3] rounded-lg p-6 text-center flex flex-col items-center shadow">
          <Instagram className="w-8 h-8 mb-3 text-[#4d4d4f]" />
          <a
            href="https://www.instagram.com/baz_pf.construction_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4d4d4f] text-[16px] font-light hover:underline"
          >
            {content.instagram}
          </a>
        </div>
      </div>
    </main>
  )
}
