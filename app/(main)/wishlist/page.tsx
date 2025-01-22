"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Load wishlist and cart from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  const addToCart = (product: Product) => {
    // Check if the product is already in the cart
    const isAlreadyInCart = cart.some((item) => item._id === product._id);

    if (isAlreadyInCart) {
      alert(`${product.title} is already in the cart.`);
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart`);
  };

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
              <Image
                src={product.productImage}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.title}</h2>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
