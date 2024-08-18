import React, { useState, useContext, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import CommentContext from '../context/CommentContext';

const CommentBox = ({ close, showClose, id }) => {
  const { addComment, user } = useContext(CommentContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const editorRef = useRef(null);

  const onContentBlur = useCallback((evt) => {
    setText(evt.currentTarget.innerHTML);
  }, []);

  const handleAddComment = () => {
    if (text.length > 250) {
      alert('Comment exceeds the maximum length of 250 characters.');
      return;
    }

    const userImage = user
      ? user.photoURL
      : 'https://static.vecteezy.com/system/resources/previews/000/576/206/original/vector-sign-of-people-icon.jpg';

    const newComment = {
      id: uuidv4(), // Use uuid to generate a unique ID
      name: user ? user.displayName : 'Current User', // Replace with the actual user's name
      text: text,
      image: image, // Include image in comment
      replies: [],
      time: new Date().toISOString(),
      reactions: [],
      userImage: userImage, // Add user image
    };

    addComment(id, newComment);
    setText(''); // Clear the input after sending
    setImage(null); // Clear the image after sending
    handleClose();
  };

  const handleClose = () => {
    close(false);
  };

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    setText(editorRef.current.innerHTML);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-auto m-2 p-2 border rounded-lg">
      <div
        contentEditable="true"
        ref={editorRef}
        onBlur={onContentBlur}
        className="w-full min-h-28 p-2 border"
      ></div>

      {/* Display image thumbnail */}
      {image && (
        <div className="my-2">
          <img src={image} alt="Thumbnail" className="w-24 h-24 object-cover" />
        </div>
      )}

      <hr className="border-none h-[2px] bg-[#333] my-5 mx-auto" />

      <div className="flex justify-between">
        <div className="flex gap-2">
          <button onClick={() => applyStyle('bold')}>Bold</button>
          <button onClick={() => applyStyle('italic')}>Italic</button>
          <button onClick={() => applyStyle('underline')}>Underline</button>
          <label>
            <span className="cursor-pointer">Add Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex gap-2">
          {showClose && <button onClick={handleClose}>Close</button>}
          <button onClick={handleAddComment}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
