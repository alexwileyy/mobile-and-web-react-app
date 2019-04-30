import {days, months} from "./variables";

export function applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
}

/**
 * Formats the time
 * @param date
 * @param prepend
 * @returns {string}
 */
export function FormatTime(date, prepend = true) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let time = `${hours}:${minutes}${ampm}`;
    if(prepend){
        time = '@ ' + time;
    }
    return time;
}

/**
 * Formats a date
 * @param date
 * @param includeTime
 * @returns {string}
 */
export function FormatDate(date, includeTime = true) {
    const day = date.getDate();
    let dateAppendix;
    switch (day % 10) {
        case 1:  dateAppendix = "st"; break;
        case 2:  dateAppendix = "nd"; break;
        case 3:  dateAppendix = "rd"; break;
        default: dateAppendix = "th"; break;
    }
    let formattedDate = `${days[date.getDay()]} ${date.getDate()}${dateAppendix} ${months[date.getMonth() + 1]} ${date.getUTCFullYear()}`;
    const formattedTime = FormatTime(date);
    formattedDate = includeTime ? formattedDate + formattedTime : formattedDate;
    return formattedDate;
}