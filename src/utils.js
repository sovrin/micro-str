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
const json = (object) => JSON.stringify(object);

/**
 *
 * @param path
 * @param data
 * @param plain
 */
const write = (path, data, plain = false) => (
    writeFileSync(path, (plain) ? data : json(data), 'binary')
);

/**
 *
 * @param file
 * @param plain
 * @returns {string}
 */
const read = (file, plain = false) => ((plain)
    ? readFileSync(file, 'binary')
    : require(file)
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 15.04.2019
 * Time: 22:27
 */
module.exports = {
    write,
    read,
    mkdir,
    exist,
};