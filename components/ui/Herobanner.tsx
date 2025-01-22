"use client";
import Image from "next/image";
import Link from "next/link";
import heroBanner from "@/public/heroBanner.png";

export default function Herobanner() {
  return (
    <section className="relative flex items-center justify-center w-full h-[80vh] sm:h-[60vh]">
      {/* Hero Image */}
      <Image
        src={heroBanner}
        alt="Modern furniture showcase in a stylish living room setting"
        className="w-full h-full object-cover"
        priority
        quality={90}
        placeholder="blur"
      />
      
      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
        <div className="max-w-[90%] md:max-w-[700px] text-center bg-yellow-400 bg-opacity-80 p-6 rounded-lg shadow-lg">
          <p className="text-sm md:text-lg font-semibold text-yellow-800 mb-2">
            New Arrival
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Our Latest Collection
          </h1>
          <p className="text-xs md:text-sm text-gray-800 mb-6">
            Explore our curated selection of premium furniture pieces designed for modern living.
          </p>
          <Link 
            href="/shop" 
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
