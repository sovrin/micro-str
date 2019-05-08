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
const stringify = (object) => JSON.stringify(object);

/**
 *
 * @param path
 * @param value
 */
const write = (path, value) => writeFileSync(path, value, 'utf-8');

/**
 *
 * @param file
 * @returns {string}
 */
const read = (file) => readFileSync(file, 'utf-8');

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 15.04.2019
 * Time: 22:27
 */
module.exports = {
    write,
    read,
    mkdir,
    exist,
    stringify,
};