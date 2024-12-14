import { createPost } from '@/actions/posts';
import PostSubmit from '@/components/PostSubmit';

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <PostSubmit action={createPost} />
    </>
  );
}
