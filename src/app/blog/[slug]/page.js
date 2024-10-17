"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = params;

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://vqo.ttt.mybluehost.me/website_232add02/wp-json/wp/v2/posts?slug=${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPost(data[0]);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading blog post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Blog post not found</div>;

  // Format the date
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
