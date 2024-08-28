import React, { useState } from 'react';
import Comment from './Comment';

const CommentsPerPage = 4; // Number of comments to show per page

const CommentList = ({ comments }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current comments to show
  const indexOfLastComment = currentPage * CommentsPerPage;
  const indexOfFirstComment = indexOfLastComment - CommentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  // Pagination Controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(comments.length / CommentsPerPage);

  return (
    <div>
      {currentComments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
          <hr className="border-none h-[2px] bg-slate-100 my-2 mx-auto" />
          {comment.replies.length > 0 && (
            <div className="border-slate-200 border-l-2 pl-5 ml-5">
              <CommentList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pagination mt-4 flex justify-center space-x-2">
          {currentPage !== 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="bg-gray-200 px-4 py-2 border rounded"
            >
              {'<'}
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage !== totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="bg-gray-200 px-4 py-2 border rounded"
            >
              {'>'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList;
