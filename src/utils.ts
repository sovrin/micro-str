const {
    writeFileSync,
    readFileSync,
    mkdirSync: mkdir,
    existsSync: exist,
} = require('fs');

/**
 *
 * @param object
 * @returns {string}
 */
export const stringify = (object: Object) => JSON.stringify(object);

/**
 *
 * @param path
 * @param value
 */
export const write = (path: string, value: string) => writeFileSync(path, value, 'utf-8');

/**
 *
 * @param file
 * @returns {string}
 */
export const read = (file: string) => readFileSync(file, 'utf-8');

/**
 *
 */
export {mkdir as mkdir};

/**
 *
 */
export {exist as exist};