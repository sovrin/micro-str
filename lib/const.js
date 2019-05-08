/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 02.05.2019
 * Time: 17:22
 */
module.exports = {
    INITIAL_STATE: {
        pointer: 0,
        keys: {},
    },
    STORE_FILE: 'store.json',
    KEYS_FOLDER: 'keys',
    VALUES_FOLDER: 'values',
    KEYS_EXT: '.json',
    VALUES_EXT: '.v',
    FIELD: {
        ID: 'i',
        DELETED: 'd',
        CREATED_AT: 'c',
        UPDATED_AT: 'u',
    },
    VALUE: {
        TRUE: 1,
        FALSE: 0,
    },
};