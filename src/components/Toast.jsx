import React, { useEffect, useState } from 'react';

const Toast = ({ message, onClose, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start with the toast off-screen
    const slideInTimer = setTimeout(() => {
      setVisible(true);
    }, 50); // Short delay to trigger the slide-in animation

    const hideTimer = setTimeout(() => {
      setVisible(false); // Start fade-out and slide-out animation
      setTimeout(() => {
        onClose(); // Remove the toast after animation ends
      }, 500); // Delay to match the fade-out duration
    }, 2500); // Keep visible for 2.5 seconds, then start fading out

    return () => {
      clearTimeout(slideInTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  // Define styles based on the toast type
  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'info':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-500 ease-in-out ${getToastStyle()} ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
