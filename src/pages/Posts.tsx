import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { URL_API } from '../api_urls';

import { User, Post as PostType } from '../types';
import Post from '../components/Post';

const Posts = ({
  propsMessage,
  componentName,
}: {
  propsMessage: string;
  componentName: string;
}) => {
  const [fetchedPosts, setFetchedPosts] = useState<Array<PostType>>();
  const [users, setUsers] = useState<Array<User>>();
  const [filteredPosts, setFilteredPosts] = useState<Array<PostType>>();

  const fetchData = useCallback(async () => {
    const res = await Promise.all([
      axios.get(`${URL_API}/posts`),
      axios.get(`${URL_API}/users`),
    ]);

    const [fetchedPosts, users] = await Promise.all(res);

    setFetchedPosts(fetchedPosts.data);
    setUsers(users.data);
  }, []);

  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredPosts(fetchedPosts);
  }, [fetchedPosts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;

    const toFilter = fetchedPosts; // we duplicate full list of fetched posts so we don't overwrite
    let filtered: any = []; // #todo replace any type

    // We only try to filter posts if filter is not empty string
    if (filter != '') {
      filtered = toFilter?.filter((post) => {
        const currentUser: any = users?.filter((user) => {
          const temp = user.username.toLowerCase();
          return temp.includes(filter);
        });

        return post.userId === currentUser[0]?.id; // #todo what if we have more the one element
      });
    }

    // if we have filtered post and filter is present
    if (filtered?.length || filter != '') {
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(fetchedPosts);
    }
  };

  return (
    <>
      <div className='columns-1'>
        <div className='mb-8'>
          <input
            className='w-full border border-solid border-neutral-300 py-2 px-6 rounded-md'
            placeholder='Filter with author name'
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>

      <div className='columns-1 md:columns-2 gap-4'>
        {filteredPosts && users ? (
          filteredPosts.map((post: any) => (
            <Post
              key={post.id}
              post={post}
              user={users[post.userId - 1]}
              propsMessage={propsMessage}
              componentName={'Post Component'}
            /> // we use user ID in array so we need to adjust it
          ))
        ) : (
          <p className='p-6'>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Posts;
