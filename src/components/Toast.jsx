import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ message, onClose }) => {
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

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg bg-blue-500 text-white transition-all duration-500 ease-in-out ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
