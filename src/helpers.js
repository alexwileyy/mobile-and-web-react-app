import {days, months} from "./variables";

export function applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
}

/**
 * Formats a date
 * @param date
 * @returns {string}
 */
export function FormatDate(date) {
    const day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let dateAppendix;
    switch (day % 10) {
        case 1:  dateAppendix = "st"; break;
        case 2:  dateAppendix = "nd"; break;
        case 3:  dateAppendix = "rd"; break;
        default: dateAppendix = "th"; break;
    }
    return `${days[date.getDay()]} ${date.getDate()}${dateAppendix} ${months[date.getMonth() + 1]} ${date.getUTCFullYear()} @ ${hours}:${minutes}${ampm}`
}