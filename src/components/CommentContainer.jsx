import React, { useContext, useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import CommentContext from '../context/CommentContext';
import { sortByTime, sortByReactions } from '../utils/utilityFunctions';

const CommentContainer = () => {
  const { commentsData } = useContext(CommentContext);
  const [sortingMethod, setSortingMethod] = useState('time'); // Default sorting method
  const [sortedComments, setSortedComments] = useState([]);

  // Update sorted comments based on sorting method
  useEffect(() => {
    if (sortingMethod === 'time') {
      setSortedComments(sortByTime(commentsData));
    } else if (sortingMethod === 'popularity') {
      setSortedComments(sortByReactions(commentsData));
    }
  }, [commentsData, sortingMethod]);

  return (
    <div className="m-2 p-2">
      <div className="flex justify-between">
        <span>CommentContainer</span>
        <div className='flex gap-2'>
          <button onClick={() => setSortingMethod('time')}>Latest</button>
          <button onClick={() => setSortingMethod('popularity')}>
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
