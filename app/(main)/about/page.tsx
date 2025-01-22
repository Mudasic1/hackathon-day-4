"use client"

import "./style.css"
import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
}

interface Category {
  name: string;
  slug: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Going all-in with millennial design",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia metus id lorem feugiat, in blandit.",
    image: "/images/business-woman.jpg"
  },
  // Add more posts as needed
];

const categories: Category[] = [
  { name: "Crafts", slug: "crafts" },
  { name: "Design", slug: "design" },
  { name: "Ideas", slug: "ideas" },
  { name: "Wood", slug: "wood" }
];

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">About Us</h1>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
              <Image
                className="w-full h-48 object-cover"
                src={post.image}
                alt={post.title}
                width={1500}
                height={800}
                priority={post.id === 1}
              />
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </section>

        <aside>
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-blue-500 hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
            <ul className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <li key={post.id} className="flex items-center space-x-3">
                  <Image
                    className="w-16 h-16 object-cover rounded"
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={100}
                  />
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-blue-500 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  </div>
  )
}

export default About

