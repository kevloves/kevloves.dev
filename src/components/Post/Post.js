// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import Translation from './Translation';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node,
  translation: string[],
};

const Post = ({ post, translations }: Props) => {
  const { html } = post;
  const { tagSlugs, slug, langKey } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        All Articles
      </Link>

      <div className={styles['post__content']}>
        {translations.length > 0 && <Translation slug={slug} lang={langKey} />}
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
