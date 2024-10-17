"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading blog posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#008751] mb-8">Blog Posts</h1>
      {posts.length === 0 ? (
        <div>No blog posts available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">{post.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} className="mb-4" />
              <Link href={`/blog/${post.slug}`} className="text-[#008751] hover:underline">
                Read more
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
