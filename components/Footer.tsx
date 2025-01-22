"use client"

import Link from 'next/link'

interface FooterLink {
  name: string;
  href: string;
}

const links: FooterLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const helpLinks: FooterLink[] = [
  { name: 'Payment Options', href: '/payment' },
  { name: 'Returns', href: '/returns' },
  { name: 'Privacy Policies', href: '/privacy' }
]

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  return (
    <footer className="bg-gray-100 p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Address Section */}
        <div>
          <Link href="/" className="inline-block">
            <h2 className="text-2xl font-bold mb-4">Funiro.</h2>
          </Link>
          <address className="text-sm text-gray-600 not-italic">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </address>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="hover:underline hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="hover:underline hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              aria-label="Email for newsletter"
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      
      <hr className="my-6 border-gray-300" />
      
      <p className="text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Funiro. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
