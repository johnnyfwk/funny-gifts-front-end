export function convertToSlug(name) {
    return name.toLowerCase().replace(/[\s/]/g, '-').replace(/&/g, 'and');
}

export function slugToCategoryName(slug) {
    const words = slug.split('-');
    const capitalisedWords = words.map(word => {
        if (word === "and") {
            return "&"
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    const categoryName = capitalisedWords.join(' ');
    return categoryName;
}