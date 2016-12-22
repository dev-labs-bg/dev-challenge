/**
 * Utility class, holds functions that solve general programming cases,
 * common to re-use.
 */
class Utils {
    /**
     * Count words in any string, see:
     * http://stackoverflow.com/a/18679657/1333836
     *
     * @param {string} s
     */
    static countWords(s) {
        if (! s.trim().length) {
            return 0;
        }

        // exclude  start and end white-space
        s = s.replace(/(^\s*)|(\s*$)/gi, '');
        // 2 or more space to 1
        s = s.replace(/[ ]{2,}/gi, ' ');
        // exclude newline with a start spacing
        s = s.replace(/\n /, '\n');

        return s.split(' ').length;
    }

    /**
     * Check if an e-mail is valid or not,
     * see: http://emailregex.com/
     *
     * @param  {string}  email
     * @return {boolean}
     */
    static isValidEmail(email: string): boolean {
        const EMAIL_REGEXP = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        return EMAIL_REGEXP.test(email);
    }
}

export default Utils;
