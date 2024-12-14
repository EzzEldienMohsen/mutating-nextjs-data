'use client';
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import React from 'react';
import Image from 'next/image';
// the config type is imageLoaderConfig from next/image
// split the url add what u need then gather it again
const imageLoader = (config) => {
  const urlStart = config.src.split('upload/')[0];
  const urlEnd = config.src.split('upload/')[1];
  const transformation = `w_200,q_${config.quality}`;
  return `${urlStart}upload/${transformation}/${urlEnd}`;
};

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.image}
          // fill prop is an alternative for using width and height props if you don't
          // know the width and height, take care it will fill all space it can get
          // fill
          // you can add a manual width here because it is known as it is set in the url
          width={200}
          height={120}
          // using quality prop you can set you image quality between 0 and 100, it will be available
          // in the config object
          quality={50}
          // loader is a prop that accepts a fn and can manipulate the url received from
          // an outside source, it accepts a config object as an argument
          loader={imageLoader}
          alt={post.title}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : undefined}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = React.useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const postId = prevPosts.findIndex((post) => post.id === updatedPostId);
      if (postId === -1) {
        return prevPosts;
      }
      const updatedPost = { ...prevPosts[postId] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[postId] = updatedPost;
      return newPosts;
    }
  );
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }
  const updatePost = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };
  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
