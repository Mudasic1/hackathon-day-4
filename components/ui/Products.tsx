"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
const sanity = createClient({
  projectId: "aw7xrfor",
  dataset: "production",
  apiVersion: "2024-01-22",
  useCdn: true,
});

// Image URL builder
const builder = imageUrlBuilder(sanity);

// Sanity image source type
type SanityImageSource = {
  _ref: string;
  _type: "image";
};

const urlFor = (source: SanityImageSource | undefined): string => {
  return source ? builder.image(source).url() : "/placeholder.png";
};

// TypeScript interface for product data
interface Product {
  _id: string;
  title: string;
  productImage?: {
    asset?: SanityImageSource;
  };
  price?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] | order(_createdAt desc)[0...6]`;
        const data = await sanity.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Load cart and wishlist from localStorage with error handling
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCart(savedCart);
      setWishlist(savedWishlist);
    } catch (err) {
      console.error("Error loading from localStorage:", err);
      // Reset to empty arrays if there's an error
      setCart([]);
      setWishlist([]);
    }
  }, []);

  const addToCart = (product: Product) => {
    const isInCart = cart.some((item) => item._id === product._id);
    if (isInCart) {
      alert("This item is already in your cart");
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added to cart successfully");
  };

  const addToWishlist = (product: Product) => {
    const isInWishlist = wishlist.some((item) => item._id === product._id);
    if (isInWishlist) {
      alert("This item is already in your wishlist");
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Item added to wishlist successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-6 mt-[50px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <article
            key={product._id}
            className="border rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative w-full h-64">
              <Image
                src={urlFor(product.productImage?.asset)}
                alt={product.title || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-t-md"
                priority={products.indexOf(product) < 3}
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-green-600 font-semibold">
                ${product.price || "Price not available"}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                  aria-label={`Add ${product.title} to wishlist`}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/shop"
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
