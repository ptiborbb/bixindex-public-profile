export const convertLinkToAbsolute = (link: string) => {
  return `${link.startsWith('http') ? '' : '//'}${link}`;
};
