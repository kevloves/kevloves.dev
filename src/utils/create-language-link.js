// @flow strict
const createLanguageLink = (slug, lang) => {
  const rawSlug = slug.replace(`/${lang}`, '');
  const languageLink = (targetLang) =>
    targetLang === 'en' ? rawSlug : `${rawSlug}/${targetLang}`;

  return languageLink;
};
export default createLanguageLink;
