// @flow strict
import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useLocalStorage } from '../../hooks';

const DarkModeToggler = () => {
  const [isDarkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const setBodyClass = (addClass, removeClass) => {
    if (document.body) {
      document.body.classList.add(addClass);
      document.body.classList.remove(removeClass);
    };
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setDarkMode(false);
      setBodyClass('light', 'dark');
    } else {
      setDarkMode(true);
      setBodyClass('dark', 'light');
    }
  };
  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={30}
    />
  );
};

export default DarkModeToggler;
