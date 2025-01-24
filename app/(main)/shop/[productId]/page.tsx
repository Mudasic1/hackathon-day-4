"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import imageUrlBuilder from '@sanity/image-url'

const sanity = createClient({
  projectId: "aw7xrfor",
  dataset: "production",
  apiVersion: "2025-01-22",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity)
const urlFor = (source: any) => builder.image(source)

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

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        // Fetch current product
        const productQuery = `*[_type == "product" && _id == $productId][0]`;
        const productData = await sanity.fetch(productQuery, { productId });
        setProduct(productData);

        // Fetch related products (excluding current product)
        const relatedQuery = `*[_type == "product" && _id != $productId][0...4]`;
        const relatedData = await sanity.fetch(relatedQuery, { productId });
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductAndRelated();
    }
  }, [productId]);

  const handleAddToCart = () => {
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 2000);
  };

  const handleAddToWishlist = () => {
    setShowWishlistPopup(true);
    setTimeout(() => setShowWishlistPopup(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src={urlFor(product.productImage).url()}
            alt={product.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showCartPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          Product added to cart!
        </div>
      )}
      
      {showWishlistPopup && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          Product added to wishlist!
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link
              href={`/shop/${relatedProduct._id}`}
              key={relatedProduct._id}
              className="group"
            >
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={urlFor(relatedProduct.productImage).url()}
                    alt={relatedProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-blue-600 font-bold mt-2">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 