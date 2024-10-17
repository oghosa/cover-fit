import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://vqo.ttt.mybluehost.me/website_232add02/wp-json/wp/v2/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: `Failed to fetch blog posts: ${error.message}` }, { status: 500 });
  }
}
