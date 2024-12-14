'use server';
import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');
  let error = [];
  if (!title || title.trim().length === 0) {
    error.push('Title field is required');
  }
  if (!content || content.trim().length === 0) {
    error.push('Content field is required');
  }
  if (!image || image.size === 0) {
    error.push('Image field is required');
  }
  if (error.length > 0) {
    return { error };
  }
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Image upload failed, Post not created, Please try again later.'
    );
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath('/', 'layout');
  redirect('/feed');
}

export const togglePostLikeStatus = async (postId) => {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
};
