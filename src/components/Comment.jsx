import { useState, useRef, useEffect } from 'react';
import CommentBox from './CommentBox';
import { getTimeDifference } from '../utils/utilityFunctions';
import Reaction from './Reaction';

const Comment = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkClamp = () => {
      if (textRef.current) {
        const fullHeight = textRef.current.scrollHeight;
        const clampedHeight = textRef.current.clientHeight;
        if (fullHeight > clampedHeight) {
          setIsClamped(true);
        }
      }
    };

    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, []);

  return (
    <div className="m-2 p-2 ">
      <div className="flex gap-2 items-center">
        <span className="rounded-xl">
          <img
            className="w-12 h-12 rounded-full"
            alt="user"
            src={comment.userImage}
          />
        </span>
        <span>{comment.name}</span>
      </div>
      <div className="text-wrap">
        <p
          ref={textRef}
          className={`text-[#787777] m-2 p-2 transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? '' : 'line-clamp-4'
          }`}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      </div>
      {isClamped && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline ml-2"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      <div className="flex gap-2 items-center">
        <Reaction commentId={comment.id} prev={comment.reactions} />
        <button onClick={() => setOpen(true)} className="px-2 border-r-2">
          Reply
        </button>
        <h6 className="text-[#A4A4A4] px-2 border-r-2">
          {getTimeDifference(comment.time)}
        </h6>
      </div>
      {/* Display multiple images */}
      {comment.images && comment.images.length > 0 && (
        <div className="mt-2 space-y-2 flex items-center gap-2">
          {comment.images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Comment Thumbnail ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
          ))}
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
