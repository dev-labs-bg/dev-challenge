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
}

export default Utils;
