// @flow strict
const createLanguageLink = (slug: string, lang: string) => {
  const rawSlug = slug.replace(`/${lang}`, '');
  const languageLink = (targetLang: string) =>
    targetLang === 'en' ? rawSlug : `${rawSlug}/${targetLang}`;

  return languageLink;
};
export default createLanguageLink;
