"use client";

import { notFound } from 'next/navigation';

async function getBlogPost(slug) {
  const res = await fetch(`https://vqo.ttt.mybluehost.me/website_232add02/wp-json/wp/v2/posts?slug=${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }
  const posts = await res.json();
  return posts[0] || null;
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#008751]">{post.title.rendered}</h1>
        <p className="text-gray-600 mb-8">Published on {formattedDate}</p>
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        />
      </article>
    </div>
  );
}
