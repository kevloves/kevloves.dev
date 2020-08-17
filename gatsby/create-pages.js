'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js')
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js')
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
              langKey
              directoryName
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  const posts = edges.filter(
    ({ node }) => 
    node.frontmatter.template === 'post'
  )

  const pages = edges.filter(
    ({ node }) => 
    node.frontmatter.template === 'page'
  )

  const translationsByDirectory = _.reduce(
    posts,
    (result, post) => {
      const directoryName = _.get(post, 'node.fields.directoryName');
      const langKey = _.get(post, 'node.fields.langKey');

      if (directoryName && langKey && langKey !== 'en') {
        (result[directoryName] || (result[directoryName] = [])).push(
          langKey
        );
      }

      return result;
    },
    {}
  );

  const defaultLangPosts = posts.filter(
    ({ node }) => node.fields.langKey === 'en'
  );

  const otherLangPosts = posts.filter(
    ({ node }) => node.fields.langKey !== 'en'
  );

  _.each(defaultLangPosts, (post) => {
    const translations =
      translationsByDirectory[_.get(post, 'node.fields.directoryName')] ||
      [];

    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/post-template.js'),
      context: {
        slug: post.node.fields.slug,
        translations
      }
    });
  });

  _.each(otherLangPosts, (post) => {
    const translations =
      translationsByDirectory[_.get(post, 'node.fields.directoryName')];

    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/post-template.js'),
      context: {
        slug: post.node.fields.slug,
        translations
      }
    });
  });


  _.each(pages, (page) => {
    createPage({
      path: page.node.fields.slug,
      component: path.resolve('./src/templates/page-template.js'),
      context: { slug: page.node.fields.slug }
    });
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);

};

module.exports = createPages;
