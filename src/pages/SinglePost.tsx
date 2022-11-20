import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { URL_API } from '../api_urls';

import { Post, User, Comment as CommentType } from '../types';

import Comment from '../components/Comment';

const SinglePost = ({
  propsMessage,
  componentName,
}: {
  propsMessage: string;
  componentName: string;
}) => {
  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Array<CommentType>>();
  const [filteredComments, setFilteredComments] =
    useState<Array<CommentType>>();

  let { id, userId } = useParams();

  const fetchData = useCallback(async () => {
    const res = await Promise.all([
      axios.get(`${URL_API}/posts/${id}`),
      axios.get(`${URL_API}/users/${userId}`),
      axios.get(`${URL_API}/comments`),
    ]);

    const [post, user, comments] = await Promise.all(res);

    setPost(post.data);
    setUser(user.data);
    setComments(comments.data);
  }, []);

  // Fetch all data
  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
    fetchData().catch((err) => console.log(err));
  }, []);

  // Set filtered comments when all comments are ready
  useEffect(() => {
    if (comments) {
      const result = comments.filter(
        (comment) => comment.postId === Number(id)
      );

      setFilteredComments(result);
    }
  }, [comments]);

  return post ? (
    <>
      <div className='columns-1'>
        <div className='my-8 p-2'>
          <p className='mb-8'>
            <Link className='underline underline-offset-2' to={'/posts/'}>
              &#171; Back
            </Link>
          </p>
          <h2 className='text-2xl mb-6 font-bold capitalize'>{post.title}</h2>
          {user && (
            <p className='mb-3'>
              by {user.username} ({user.name})
            </p>
          )}
          <p>{post.body}</p>
        </div>

        <div className='my-8 p-2'>
          <h3 className='text-xl mb-4 font-semibold capitalize'>
            Comments ({filteredComments?.length}):
          </h3>

          {filteredComments ? (
            filteredComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                propsMessage={propsMessage}
                componentName={'Comment Component'}
              />
            ))
          ) : (
            <p>Loading Comments...</p> // Check if needed #todo
          )}
        </div>
      </div>
    </>
  ) : (
    <div className='columns-1'>
      <div className='my-8 p-2'>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default SinglePost;
