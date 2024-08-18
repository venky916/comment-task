import React, { createContext, useState, useEffect } from 'react';

// Create the context with default values
const CommentContext = createContext({});

export const CommentProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user,setUser] = useState(null);

  useEffect(() => {
    // Fetch comments from the JSON file
    fetch('/comments.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCommentsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Save commentsData to localStorage whenever it changes
    localStorage.setItem('commentsData', JSON.stringify(commentsData));
    localStorage.setItem("user",JSON.stringify(user))
  }, [commentsData,user]);

const addComment = (id, newComment) => {
  const updateReplies = (comments) => {
    if (id === 0) {
      // Return a new array with the new comment added at the beginning
      return [newComment, ...comments];
    } else {
      return comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [newComment, ...comment.replies],
          };
        } else {
          return {
            ...comment,
            replies: updateReplies(comment.replies),
          };
        }
      });
    }
  };

  const updatedComments = updateReplies(commentsData);
  setCommentsData(updatedComments);
};

  const updateCommentReactions = (commentId, newReactions) => {
    const updateReactions = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            reactions: newReactions,
          };
        } else {
          return {
            ...comment,
            replies: updateReactions(comment.replies),
          };
        }
      });
    };

    const updatedComments = updateReactions(commentsData);
    setCommentsData(updatedComments);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;

  return (
    <CommentContext.Provider
      value={{ commentsData, addComment, updateCommentReactions, user ,setUser}}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
