export function applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
}