import React, { useState, useContext, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import CommentContext from '../context/CommentContext';
import upload from '../assets/upload.png';
import Toast from './Toast';

const CommentBox = ({ close, showClose, id }) => {
  const { addComment, user } = useContext(CommentContext);
  const [text, setText] = useState('');
  const [images, setImages] = useState([]); // Array to store multiple images
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const editorRef = useRef(null);

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // Automatically hide the toast after 3 seconds
  };

  const userList = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  const onContentBlur = useCallback((evt) => {
    setText(evt.currentTarget.innerHTML);
  }, []);

  const handleAddComment = () => {
    console.log(editorRef.current.innerText.length);
    if (editorRef.current.innerText.length > 250) {
      alert('Comment exceeds the maximum length of 250 characters.');
      return;
    }

    const userImage = user
      ? user.photoURL
      : 'https://static.vecteezy.com/system/resources/previews/000/576/206/original/vector-sign-of-people-icon.jpg';

    const newComment = {
      id: uuidv4(),
      name: user ? user.displayName : 'Current User',
      text: text,
      images: images,
      replies: [],
      time: new Date().toISOString(),
      reactions: [],
      userImage: userImage,
    };
    addComment(id, newComment);
    setText('');
    setImages([]); // Reset images after adding the comment
    editorRef.current.innerText = '';
    handleClose();
    showToast('This is a success message!');
  };

  const handleClose = () => {
    close(false);
  };

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    setText(editorRef.current.innerHTML);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
      });
    });

    Promise.all(newImages).then((uploadedImages) => {
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    });
  };

  const handleKeyUp = (event) => {
    const content = editorRef.current.innerText;
    const atIndex = content.lastIndexOf('@');

    // Show suggestions if '@' is found and it's near the end of the content
    if (atIndex > -1 && atIndex === content.length - 1) {
      setShowSuggestions(true);
      setSuggestions(userList);
    } else if (atIndex > -1 && atIndex < content.length - 1) {
      const searchQuery = content.slice(atIndex + 1);
      if (searchQuery) {
        setShowSuggestions(true);
        setSuggestions(
          userList.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const content = editorRef.current.innerHTML;
    const atIndex = content.lastIndexOf('@');
    const mention = `<span class="bg-blue-100 text-blue-600 rounded-lg px-2">@${suggestion.name}</span>&nbsp;`;

    // Apply background color to the mention
    const newContent =
      content.slice(0, atIndex) + mention + content.slice(atIndex + 1);
    editorRef.current.innerHTML = newContent;
    setText(editorRef.current.innerHTML);
    setShowSuggestions(false);
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <div className="relative h-auto m-2 p-4 border rounded-lg bg-white shadow-md">
        <div
          contentEditable="true"
          ref={editorRef}
          onBlur={onContentBlur}
          onKeyUp={handleKeyUp}
          className="relative  min-h-28 p-2 border bg-gray-100 rounded"
        ></div>

        {/* Display suggestions */}
        {showSuggestions && (
          <ul className="absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10 rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        {/* Display image thumbnails */}
        {images.length > 0 && (
          <div className="my-2 flex gap-2 flex-wrap">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 object-cover"
              />
            ))}
          </div>
        )}

        <hr className="border-none h-[2px] bg-[#333] my-5 mx-auto" />

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => applyStyle('bold')}
              className="text-[#7E7E7E] font-bold px-2"
            >
              B
            </button>
            <button
              onClick={() => applyStyle('italic')}
              className="text-[#7E7E7E] font-bold px-2"
            >
              I
            </button>
            <button
              onClick={() => applyStyle('underline')}
              className="text-[#7E7E7E] font-bold px-2 underline"
            >
              U
            </button>
            <label className="flex items-center cursor-pointer">
              <img src={upload} alt="uploadimage" className="h-4 mr-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple // Allow multiple file selection
                className="hidden"
              />
            </label>
          </div>
          <div className="flex gap-2">
            {showClose && (
              <button
                onClick={handleClose}
                className="bg-[#E5E5E5] px-6 py-2 rounded-lg text-black font-bold"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleAddComment}
              className="bg-[#1D1D1D] text-[#d3d3d3] px-6 py-2 rounded-lg font-bold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
