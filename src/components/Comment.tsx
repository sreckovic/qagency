import { useEffect } from 'react';

import { Comment as CommentType } from '../types';

const Comment = ({
  comment,
  propsMessage,
  componentName,
}: {
  comment: CommentType;
  propsMessage: string;
  componentName: string;
}) => {
  const mailto = `mailto:${comment.email}`;

  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
  }, []);

  return (
    <div className='mb-4 p-6 bg-slate-50 rounded-md shadow-sm'>
      <p className='mb-2'>
        <span className='capitalize'>
          <a
            href={mailto}
            className='underline underline-offset-2 hover:no-underline'
          >
            {comment.name}
          </a>
        </span>{' '}
        wrote:
      </p>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;
