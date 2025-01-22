"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage: number;
  productImage: {
    asset: {
      _ref: string;
    };
  };
}

export default function Checkout() {
  const [cart, setCart] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    }
  }, []);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill out all required fields.");
      return;
    }

    // Clear cart and redirect
    localStorage.removeItem("cart");
    setCart([]);
    alert(`Order placed successfully! Thank you, ${formData.name}`);
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty. <a href="/" className="text-blue-500">Go back to shop</a>.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
          {/* Checkout Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Billing Details</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Place Order
              </button>
            </form>

            {/* Cart Summary */}
            <div>
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between border-b pb-2 mb-2"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={urlFor(product.productImage).url()}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-green-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="text-right font-bold text-lg">
                Total: ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
