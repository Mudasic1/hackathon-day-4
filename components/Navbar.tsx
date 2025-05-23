"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";

const NavItems = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/shop" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search triggered with query:", searchQuery); // Debug log
    
    if (searchQuery.trim()) {
      const searchUrl = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      console.log("Navigating to:", searchUrl); // Debug log
      
      router.push(searchUrl);
      setSearchOpen(false);
      setSearchQuery("");
    } else {
      console.log("Empty search query"); // Debug log
    }
  };

  const handleSearchClick = () => {
    console.log("Search button clicked"); // Debug log
    setSearchOpen(!searchOpen);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("Search query updated:", e.target.value); // Debug log
  };

  // Close menus when clicking outside
  const handleClickOutside = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <nav className="relative z-50">
      {/* Navbar for large screens */}
      <div className="flex flex-wrap justify-between items-center w-full h-16 bg-white px-4 lg:px-6 shadow-md relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Furniro Logo" 
            width={30} 
            height={30}
            priority
          />
          <h1 className="text-xl lg:text-2xl font-bold">Furniro</h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-6" role="navigation">
          {NavItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="text-sm lg:text-lg font-medium hover:text-blue-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Icons and Authentication */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Icons - Only show on large screens */}
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <Link 
              href="/wishlist" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Wishlist"
            >
              <Image src="/wishlist.svg" alt="Wishlist" width={24} height={24} />
            </Link>
            
            <Link 
              href="/cart" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Cart"
            >
              <Image src="/cart.svg" alt="Cart" width={24} height={24} />
            </Link>
            
            <button 
              onClick={handleSearchClick}
              className="hover:opacity-75 transition-opacity"
              aria-label="Search"
              type="button"
            >
              <Image src="/search.svg" alt="Search" width={24} height={24} />
            </button>
          </div>

          {/* User Authentication */}
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <button className="text-red-500 text-sm sm:text-base hover:underline">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton>
              <button className="rounded-full bg-blue-500 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-600 transition">
                Sign In
              </button>
            </SignInButton>
          )}

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <Image src="/menu.png" alt="" width={25} height={25} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" 
          onClick={handleClickOutside}
        >
          <div 
            className="bg-white shadow-md w-full mx-4 max-w-sm rounded-lg py-6" 
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center gap-6 p-4">
              {NavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="block text-xl font-medium text-gray-700 hover:text-blue-500 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Mobile Menu Icons */}
              <div className="flex items-center gap-8 mt-4">
                <Link 
                  href="/wishlist" 
                  className="flex flex-col items-center gap-1"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="/wishlist.svg" alt="Wishlist" width={28} height={28} />
                  <span className="text-sm">Wishlist</span>
                </Link>
                
                <Link 
                  href="/cart" 
                  className="flex flex-col items-center gap-1"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="/cart.svg" alt="Cart" width={28} height={28} />
                  <span className="text-sm">Cart</span>
                </Link>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchOpen(!searchOpen);
                    setMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1"
                  type="button"
                >
                  <Image src="/search.svg" alt="Search" width={28} height={28} />
                  <span className="text-sm">Search</span>
                </button>
              </div>
              {/* Mobile Authentication */}
              <div className="mt-6">
                {isSignedIn ? (
                  <div className="flex flex-col items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                    <SignOutButton>
                      <button className="text-red-500 text-base hover:underline">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                ) : (
                  <SignInButton>
                    <button className="rounded-full bg-blue-500 text-white text-base px-6 py-2 hover:bg-blue-600 transition">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}

      {/* Search Input - Fixed version */}
      {searchOpen && (
        <div 
          className="absolute w-full bg-white shadow-lg border-t z-40"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                aria-label="Search products"
                autoFocus
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                aria-label="Submit search"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
