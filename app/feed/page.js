import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// you can generate a dynamic metadata by exporting a function called generateMetadata that
// allow you to generate dynamic metadata
export const generateMetadata = async () => {
  const posts = await getPosts();
  const postsNumber = posts.length;
  return {
    title: `View all of our ${postsNumber} posts `,
    description: 'These are all of our posts',
  };
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
