import React, { useState, useContext } from 'react';
import CommentContext from '../context/CommentContext';
import logo from '../assets/Image.png'

const Message = ({ commentId, prev }) => {
  const { updateCommentReactions } = useContext(CommentContext);
  const [reactions, setReactions] = useState(prev);
  const [showPicker, setShowPicker] = useState(false);

  const availableEmojis = ['👍', '❤️', '😂', '😢', '👏', '😮'];

  const handleReactionClick = (emoji) => {
    const updatedReactions = reactions.map((reaction) =>
      reaction.emoji === emoji
        ? { ...reaction, count: reaction.count + 1 }
        : reaction,
    );
    setReactions(updatedReactions);
    updateCommentReactions(commentId, updatedReactions);
  };

  const handleEmojiSelect = (emoji) => {
    const existingReaction = reactions.find(
      (reaction) => reaction.emoji === emoji,
    );

    if (existingReaction) {
      handleReactionClick(emoji);
    } else {
      const updatedReactions = [...reactions, { emoji, count: 1 }];
      setReactions(updatedReactions);
      updateCommentReactions(commentId, updatedReactions);
    }

    setShowPicker(false);
  };

  return (
    <div className="relative px-2 border-r-2">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="bg-gray-200 text-black rounded-lg px-2 py-1 "
        >
          <img src={logo} alt="logo" />
        </button>
        {reactions &&
          reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => handleReactionClick(reaction.emoji)}
              className=" rounded-2xl px-2 py-1"
            >
              {reaction.emoji} {reaction.count}
            </button>
          ))}
      </div>
      {showPicker && (
        <div className="absolute bottom-full mb-2 flex gap-1 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {availableEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
              className="text-2xl"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Message;
