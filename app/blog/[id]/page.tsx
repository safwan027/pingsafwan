

// import BlogPostClient from '@/app/blog/[id]/BlogPostClient';
// import blog from '@/data/content.json';
// import { BlogPost, fetchContent } from '@/lib/contentClient';
// import { useEffect, useState } from 'react';

// // This function tells Next.js which dynamic routes to pre-render at build time.
// // Replace the example IDs with your actual blog post IDs or fetch them from a data source.


// const [posts, setPosts] = useState<BlogPost[]>([]);
// //const [terminalOpen, setTerminalOpen] = useState(false);

// // useEffect(() => {
// //   const loadPosts = async () => {
// //     try {
// //       const content = await fetchContent();
// //       setPosts(content.blog || []);
// //     } catch (error) {
// //       console.error('Failed to load blog posts:', error);
// //     }
// //   };

// //   loadPosts();
// // }, []);


// export async function generateStaticParams() {

//     const loadPosts = async () => {
//     try {
//       const content = await fetchContent();
//       setPosts(content.blog || []);
//     } catch (error) {
//       console.error('Failed to load blog posts:', error);
//     }
//   };

//   loadPosts();
//   return posts.map((p: { id: string }) => ({ id: p.id }));
// }

// export default function BlogPostPage({ params }: { params: { id: string } }) {
//   const postId = params.id;
//   return <BlogPostClient postId={postId} />;
// }



// //export function getpostid({ params }: { params: { id: string } }) {
// //   const postId = params.id;
// // }



import BlogPostClient from '@/app/blog/[id]/BlogPostClient';
import { getContent } from '@/lib/db';
import { fetchBlogPosts } from '@/lib/db';

//let content: { blog: any[] };
// 1. This runs on the SERVER at build time
export async function generateStaticParams() {
  try {
    const content = await fetchBlogPosts();
    console.log('Generating static params for blog posts:', content);
    return content.map((post) => ({ id: post.id }));
  } catch (error) {
    console.error('Failed to generate params:', error);
    return [];
  }
}

// 2. This is the Page Component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const content = await fetchBlogPosts();
  console.log('Fetched content for blog post page:', content);
  
  const post = content.find((item) => item.id === params.id) ?? null;
  //console.log('Rendering post:', post);

  return <BlogPostClient post={post} />;
  //return null;
}






