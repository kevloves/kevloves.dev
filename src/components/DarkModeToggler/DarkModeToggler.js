// @flow strict
import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useLocalStorage } from '../../hooks';

const DarkModeToggler = () => {
  const [isDarkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const addDarkClass = () => {
    document.body.classList.add('dark');
  };

  const removeDarkClass = () => {
    document.body.classList.remove('dark');
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setDarkMode(false);
      removeDarkClass();
    } else {
      setDarkMode(true);
      addDarkClass();
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
