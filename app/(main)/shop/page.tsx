"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";

const sanity = createClient({
  projectId: "aw7xrfor",
  dataset: "production",
  apiVersion: "2025-01-22",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);
const urlFor = (source: { asset?: { _ref: string } } | null | undefined): string => {
  return source?.asset?._ref ? builder.image(source).url() : "/placeholder.png";
};

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  tags: string[];
  isNew: boolean;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          title,
          price,
          description,
          discountPercentage,
          productImage,
          tags,
          isNew
        }`;
        const data = await sanity.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Load cart and wishlist from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as Product[];
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]") as Product[];
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart`);
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.find((item) => item._id === product._id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert(
      isInWishlist
        ? `${product.title} removed from wishlist`
        : `${product.title} added to wishlist`
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 py-[200px] bg-blue-400 rounded-lg">Shop</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={urlFor(product.productImage)}
              alt={product.title}
              width={500} // Provide a default width
              height={300} // Provide a default height
              className="w-full h-48 rounded-md object-cover"
            />

            <div className="mt-4">
              <Link href={`/shop/${product._id}`}>
                <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                  {product.title}
                </h2>
              </Link>

              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-slate-600 font-bold">${product.price.toFixed(2)}</p>
                  {product.discountPercentage > 0 && (
                    <p className="text-green-500 font-bold">
                      -{product.discountPercentage}% OFF
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => addToCart(product)}
                className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                {wishlist.find((item) => item._id === product._id) ? "Remove" : "Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
