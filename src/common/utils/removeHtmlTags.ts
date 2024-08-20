const removeHtmlTags = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, '');

export default removeHtmlTags;
