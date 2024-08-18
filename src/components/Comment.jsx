import {  useState } from 'react';
import CommentBox from './CommentBox';
import Message from './Message';
import { getTimeDifference } from '../utils/utilityFunctions';

const Comment = ({ comment }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="m-2 p-2 ">
      <div className="flex gap-2 items-center">
        <span className="rounded-xl">
          <img className="w-12 h-12" alt="user" src={comment.userImage} />
        </span>
        <span>{comment.name}</span>
      </div>
      <p className="font-semibold text-[#787777] m-2 p-2">{comment.text}</p>
      <div className="flex gap-2 items-center">
        <Message commentId={comment.id} prev={comment.reactions} />
        <button onClick={() => setOpen(true)} className=" px-2 border-r-2">
          Reply
        </button>
        <h6 className="text-[#A4A4A4] px-2 border-r-2">
          {getTimeDifference(comment.time)}
        </h6>
      </div>
      {comment.image && (
        <div className="mt-2 rounded-md">
          <img
            src={comment.image}
            alt="Comment Thumbnail"
            className="w-24 h-24 object-cover"
          />
        </div>
      )}
      {open && (
        <CommentBox
          close={() => setOpen(false)}
          showClose={true}
          id={comment.id}
        />
      )}
    </div>
  );
};

export default Comment;
