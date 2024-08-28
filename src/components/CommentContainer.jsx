import React, { useContext, useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import CommentContext from '../context/CommentContext';
import {
  sortByTime,
  sortByReactions,
  countComments,
} from '../utils/utilityFunctions';

const CommentContainer = () => {
  const { commentsData } = useContext(CommentContext);
  const [sortingMethod, setSortingMethod] = useState('time'); // Default sorting method
  const [sortedComments, setSortedComments] = useState([]);
 
  const count =countComments(commentsData);

  // Update sorted comments based on sorting method
  useEffect(() => {
    if (sortingMethod === 'time') {
      setSortedComments(sortByTime(commentsData));
    } else if (sortingMethod === 'popularity') {
      setSortedComments(sortByReactions(commentsData));
    }
  }, [commentsData, sortingMethod]);

  return (
    <div className="m-4 p-2 border-2 rounded-xl shadow-lg ">
      <div className="flex justify-between items-center mb-2">
        <span className='font-bold text-3xl'>Comments {count}</span>
        <div className="flex gap-2 border p-1 rounded bg-slate-50">
          <button
            onClick={() => setSortingMethod('time')}
            className={`p-2 ${sortingMethod === 'time' ? 'font-bold' : ''}`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortingMethod('popularity')}
            className={`p-2 ${
              sortingMethod === 'popularity' ? 'font-bold' : ''
            }`}
          >
            Popularity
          </button>
        </div>
      </div>
      <CommentBox close={() => {}} showClose={false} id={0} />
      <CommentList comments={sortedComments} />
    </div>
  );
};

export default CommentContainer;
