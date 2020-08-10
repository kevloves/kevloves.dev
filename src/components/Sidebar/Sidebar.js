// @flow strict
import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const [isDarkMode, setDarkMode] = React.useState(false);
  const setBodyClass = (addClass, removeClass) => {
    document.body.classList.add(addClass);
    document.body.classList.remove(removeClass);
  };
  const toggleDarkMode = (checked: boolean) => {
    if (isDarkMode) {
      setBodyClass('light', 'dark');
    } else {
      setBodyClass('dark', 'light');
    }
    setDarkMode(checked);
  };

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
