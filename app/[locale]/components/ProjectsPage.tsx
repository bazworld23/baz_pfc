// components/ProjectsPage.tsx (server)
"use client"

import { useParams } from 'next/navigation'

export default function ProjectsPage() {
  const params = useParams() as { locale?: string } | undefined
  const locale = params?.locale || 'en'
  const isEN = locale === 'en'

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-light text-[#4d4d4f] mb-8">{isEN ? 'Projects' : 'Έργα'}</h2>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left column: text, image, caption */}
        <div className="h-full flex flex-col">
          <p className="text-[26px] text-[#4d4d4f] mb-4">
            {isEN ? (
              <>
                The company <strong>Coffee Lab</strong>, recognized both in Greece and abroad, trusts us in its stores.
              </>
            ) : (
              <>
                Η εταιρεία <strong>Coffee Lab</strong>, αναγνωρισμένη τόσο στην Ελλάδα όσο και στο εξωτερικό, μας εμπιστεύεται στα καταστήματά της.
              </>
            )}
          </p>
          <div className="mb-2 flex-grow">
            <img src="/services/projects/1.jpg" alt="Project 1" className="w-full h-full rounded-md shadow-sm" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light mt-auto">{isEN ? 'Custom corner sofa, tufted' : 'Custom γωνιακός καναπές, καπιτονέ'}</div>
        </div>

        {/* Right column: image, caption */}
        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/2.jpg" alt="Project 2" className="w-full h-full rounded-md shadow-sm" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light mt-auto">{isEN ? 'Repair of meeting room armchairs' : 'Επισκευή σε πολυθρόνες meeting room'}</div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:[grid-template-columns:48fr_52fr] gap-8 items-stretch">
        {/* Second section: left caption above image 3, right image 4 full height */}
        <div className="h-full flex flex-col justify-end">
          <div className="mb-2">
            <img src="/services/projects/3.jpg" alt="Project 3" className="w-full rounded-md" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light">{isEN ? 'Construction of pillows for luxury studio apartments' : 'Κατασκευή μαξιλαριών για luxury studo plates'}</div>
        </div>

        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/4.jpg" alt="Project 4" className="w-full h-full rounded-md shadow-sm" />
          </div>
        </div>
      </section>

      {/* third section */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-stretch">
        {/* Left column: text, image, caption */}
        <div className="h-full flex flex-col justify-end">
          <p className="text-[26px] text-[#4d4d4f] mb-4 lg:max-w-[300px]">
            {isEN ? (
              <>
                <strong>COCO-MAT Hotels</strong> trust us with the repair of their furniture.
              </>
            ) : (
              <>
                Τα <strong>COCO-MAT Hotels</strong> μας εμπιστεύονται στην επισκευή των επίπλων τους.
              </>
            )}
          </p>
          <div className="mb-2 w-full">
            <img src="/services/projects/5.jpg" alt="Project 1" className="w-full rounded-md shadow-sm" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light">{isEN ? 'Leather sofa repair' : 'Επισκευή δερμάτινου καναπέ'}</div>
        </div>

        {/* Right column: image, caption */}
        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/6.jpg" alt="Project 2" className="w-full h-full rounded-md shadow-sm" />
          </div>
        </div>
      </section>

      
      {/* fourth section */}
      <section className="mt-12">
        <div className="max-w-5xl">
          <p className="text-[26px] text-[#4d4d4f] mb-6 lg:max-w-[750px]">
            {isEN ? (
              <>
                Our company is the <strong>official representative</strong> in Greece for the service of <strong>NATUZZI</strong>, one of the leading Italian brands worldwide in handcrafted furniture.
              </>
            ) : (
              <>
                Η εταιρεία μας είναι ο <strong>επίσημος αντιπρόσωπος</strong> Ελλάδος στο service του οίκου <strong>NATUZZI</strong>, ενός από τα κορυφαία ιταλικά brands παγκοσμίως στο χειροποίητο έπιπλο.
              </>
            )}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <img
            src="/services/projects/7.jpg"
            alt="Natuzzi Service Project"
            className="w-full lg:w-[80%] rounded-md shadow-sm"
          />
        </div>
      </section>

      {/* fifth section */}
      <section className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left large image */}
          <div className="flex flex-col">
            <div className="h-full">
              <img
                src="/services/projects/8.jpg"
                alt="Yacht Antika"
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </div>
            <div className="text-md text-[#6b6b6d] font-light mt-3">
              {isEN ? 'Yacht lounge repair Antika' : 'Επισκευή σαλονιού yacht Antika'}
            </div>
          </div>

          {/* Right two stacked images */}
          <div className="flex flex-col gap-3">
            <div>
              <img
                src="/services/projects/9.jpg"
                alt="Yacht exterior"
                className="w-full rounded-md shadow-sm"
              />
            </div>
            <div>
              <img
                src="/services/projects/10.jpg"
                alt="Yacht My Eden"
                className="w-full rounded-md shadow-sm"
              />
            </div>
            <div className="text-md text-[#6b6b6d] font-light mt-3">
              {isEN ? 'Construction of yacht covers My Eden' : 'Κατασκευή καλυμμάτων yacht My Eden'}
            </div>
          </div>
        </div>
      </section>

      

      {/* sixth section */}
      <section className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left large image */}
          <div className="flex flex-col gap-6">
            <div className="h-full">
              <img
                src="/services/projects/11.jpg"
                alt="Airbnb Sofa Construction"
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </div>
            <div className="text-md text-[#6b6b6d] font-light">
              {isEN ? 'Custom modular sofa for Airbnb' : 'Κατασκευή αποσπώμενου καναπέ για Airbnb'}
            </div>
          </div>

          {/* Right two stacked images */}
          <div className="flex flex-col gap-6">
            <div>
              <img
                src="/services/projects/12.jpg"
                alt="Seat cushions"
                className="w-full rounded-md shadow-sm"
              />
            </div>
            <div>
              <img
                src="/services/projects/13.jpg"
                alt="Workout Project equipment"
                className="w-full rounded-md shadow-sm"
              />
            </div>
            <div className="text-md text-[#6b6b6d] font-light">
              {isEN ? 'Repair of gym equipment – The Workout Project' : 'Επισκευή οργάνων The Workout Project'}
            </div>
          </div>
        </div>
      </section>


    <section className="mt-12 grid grid-cols-1 lg:[grid-template-columns:45fr_55fr] gap-8 items-stretch">
        {/* seventh section: left caption above image 3, right image 4 full height */}
        <div className="h-full flex flex-col justify-end">
          <div className="">
            <img src="/services/projects/14.jpg" alt="Project 14" className="w-full rounded-md" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light">{isEN ? 'Construction of pillows for luxury studio apartments' : 'Κατασκευή μαξιλαριών για luxury studio apartments'}</div>
        </div>

        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/15.jpg" alt="Project 15" className="w-full h-full rounded-md shadow-sm" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light mt-auto">{isEN ? 'Construction of pillows for luxury studio apartments' : 'Κατασκευή μαξιλαριών για luxury studio apartments'}</div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:[grid-template-columns:55fr_45fr] gap-4 items-stretch">
        {/* eight section: left caption above image 3, right image 4 full height */}
        <div className="h-full flex flex-col">
          <div className="flex-grow">
            <img src="/services/projects/16.jpg" alt="Project 16" className="w-full h-full rounded-md" />
          </div>
        </div>

        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/17.jpg" alt="Project 17" className="w-full h-full rounded-md shadow-sm" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 lg:[grid-template-columns:55fr_45fr] gap-4 items-stretch">
        {/* ninth section: left caption above image 3, right image 4 full height */}
        <div className="h-full flex flex-col">
          <div className="flex-grow">
            <img src="/services/projects/18.jpg" alt="Project 18" className="w-full h-full rounded-md" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light">
              {isEN ? 'Yacht lounge repair Antika' : 'Επισκευή σαλονιού yacht Antika'}
            </div>
        </div>

        <div className="h-full flex flex-col">
          <div className="h-full w-full">
            <img src="/services/projects/19.jpg" alt="Project 19" className="w-full h-full rounded-md shadow-sm" />
          </div>
          <div className="text-md text-[#6b6b6d] font-light">
              {isEN ? 'Construction of yacht covers My Eden' : 'Κατασκευή καλυμμάτων yacht My Eden'}
            </div>
        </div>
      </section>

    </div>
  )
}
