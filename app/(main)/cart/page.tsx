"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    }
  }, []);

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleCheckout = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkoutCart', JSON.stringify(cart));
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-3 border-b"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={`https://cdn.sanity.io/images/qtlc5g66/production/${product.productImage.asset._ref
                    .replace("image-", "")
                    .replace("-jpg", ".jpg")}`}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-green-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-lg mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <button
            className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
