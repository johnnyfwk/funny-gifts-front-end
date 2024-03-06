export function convertToSlug(name) {
    return name.toLowerCase().replace(/[\s/]/g, '-').replace(/&/g, 'and');
}