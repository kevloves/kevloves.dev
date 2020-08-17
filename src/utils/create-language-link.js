// @flow strict
const createLanguageLink = (slug: string, lang: string) => {
  const rawSlug = slug.replace(`/${lang}`, '');
  const languageLink = (targetLang: string) =>
    targetLang === 'en' ? rawSlug : `/${targetLang}${rawSlug}`;

  return languageLink;
};
export default createLanguageLink;
