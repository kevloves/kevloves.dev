// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <img
        src={author.photo}
        className={styles['author__photo']}
        width="50"
        height="50"
        alt={author.name}
      />
      <p className={styles['author__bio']}>
        Personal site by{' '}
        <a href={getContactHref('twitter', author.contacts.twitter)}>
          {author.name}
        </a>
        .
        <br />
        {author.bio}
      </p>
    </div>
  );
};

export default Author;
