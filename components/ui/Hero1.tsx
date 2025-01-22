"use client"

import Image from "next/image"

const ads = [
    {
        id: 1,
        image: "/ads.png",
        name: "Dining",
        alt: "Dining room furniture showcase"
    },
    {
        id:2,
        image: "/ad1.png",
        name: "Living",
        alt: "Living room furniture showcase"
    },
    {
        id:3,
        name: "Bedroom",
        image: "/ad2.png",
        alt: "Bedroom furniture showcase"
    }
]

export default function Hero1() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center mt-10">
        <div className="text-center">
            <h2 className="text-4xl font-bold">Browse The Range</h2>
        </div>
        <div className="flex gap-[70px] mt-10 max-sm:flex-col max-sm:items-center max-sm:justify-center">
            {ads.map((ad) => (
                <div key={ad.id} className="w-[300px] h-[380px] bg-gray-200 rounded-lg flex flex-col overflow-hidden">
                    <div className="relative w-full h-[300px]">
                        <Image 
                            src={ad.image} 
                            alt={ad.alt} 
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover"
                            priority={ad.id === 1}
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-center text-xl font-bold">{ad.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}
