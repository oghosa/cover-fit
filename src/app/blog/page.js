"use client";

import Link from 'next/link';

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return readTime;
}

async function getBlogPosts() {
  const res = await fetch('https://vqo.ttt.mybluehost.me/website_232add02/wp-json/wp/v2/posts', { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#008751] mb-12">Blog Posts</h1>
      {posts.length === 0 ? (
        <div>No blog posts available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const readTime = estimateReadTime(post.content.rendered);

            return (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold mb-3 text-[#008751] group-hover:text-[#006741] transition-colors duration-300">
                      {post.title.rendered}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">{formattedDate} • {readTime} min read</p>
                    <div 
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                      className="mb-4 text-gray-700 flex-grow"
                    />
                    <div className="mt-auto">
                      <span className="inline-block bg-[#008751] text-white font-semibold py-2 px-4 rounded hover:bg-[#006741] transition-colors duration-300">
                        Read more
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
