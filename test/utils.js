const {readdirSync, unlinkSync, existsSync, mkdirSync, rmdirSync, lstatSync} = require('fs');
const {resolve} = require('path');

/**
 *
 * @param path
 */
const clean = (path) => {
    if (!existsSync(path)) {
        return;
    }

    const files = readdirSync(path);

    for (const file of files) {
        const cursor = resolve(path, file);

        if (lstatSync(cursor).isDirectory()) {
            clean(cursor);
        } else {
            unlinkSync(cursor);
        }
    }

    rmdirSync(path);
};

/**
 *
 */
const prepare = (path) => {
    const cursor = resolve(path);

    if (!existsSync(cursor)) {
        mkdirSync(cursor);
    }
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 06.05.2019
 * Time: 21:04
 */
module.exports = {
    clean,
    prepare,
};
