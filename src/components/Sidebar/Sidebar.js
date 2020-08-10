// @flow strict
import React, { useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata, useLocalStorage } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const [isDarkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const setBodyClass = (addClass, removeClass) => {
    document.body.classList.add(addClass);
    document.body.classList.remove(removeClass);
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

  useEffect(() => {
    if (isDarkMode) {
      setBodyClass('dark', 'light');
    }
  });

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
        />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
