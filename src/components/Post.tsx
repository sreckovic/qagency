import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User, Post as PostType } from '../types';

const Post = ({
  post,
  user,
  propsMessage,
  componentName,
}: {
  post: PostType;
  user: User;
  propsMessage: string;
  componentName: string;
}) => {
  useEffect(() => {
    console.log(propsMessage, componentName);
  }, []);

  return (
    <div className='mb-4 p-6 bg-slate-50 rounded-md shadow-sm'>
      <h2 className='text-xl mb-1 font-bold capitalize'>
        <Link
          className='hover:underline underline-offset-2'
          to={`/posts/${post.id}/${post.userId}`}
        >
          {post.title}
        </Link>
      </h2>

      {user && <p className='mb-3'>by {user.username}</p>}

      <p className='mb-1'>{post.body.substring(0, 50)}...</p>
      <p>
        <Link
          className='text-sm underline underline-offset-2 hover:no-underline'
          to={`/posts/${post.id}/${post.userId}`}
        >
          Read More &#187;
        </Link>
      </p>
    </div>
  );
};

export default Post;
