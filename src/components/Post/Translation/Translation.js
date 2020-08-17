// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import { createLanguageLink } from '../../../utils';
import { supportedLanguages } from '../../../constants/locales';
import styles from './Translation.module.scss';

type Props = {
  slug: string,
  lang: string,
};

const Translation = ({ slug, lang }: Props) => {
  const languageLink = createLanguageLink(slug, lang);

  return (
    <div className={styles['translation']}>
      <p className={styles['translation__panel']}>
        <span>
          {lang === 'en' ? (
            <Link to={languageLink('zh-TW')}>
              {supportedLanguages['zh-TW']}
            </Link>
          ) : (
            <Link to={languageLink('en')}>{supportedLanguages['en']}</Link>
          )}
        </span>
      </p>
    </div>
  );
};

export default Translation;
