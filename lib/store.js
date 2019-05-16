const {write, exist, stringify, mkdir} = require('./utils');
const {KEYS_FOLDER, VALUES_FOLDER, STORE_FILE, INITIAL_STATE} = require('./const');

const factory = (resolver) => {
    const Path = {
        KEYS: resolver(KEYS_FOLDER),
        VALUES: resolver(VALUES_FOLDER),
    };

    const File = {
        STORE: resolver(STORE_FILE),
    };

    const init = () => {
        mkdir(Path.KEYS);
        mkdir(Path.VALUES);

        const initial = stringify(INITIAL_STATE);
        write(File.STORE, initial);
    };

    if (!exist(File.STORE)) {
        init();
    }

    let store = require(File.STORE);
    let keys = {};

    const next = () => ++store.pointer;

    const _alias = (key) => (typeof key === 'number')
        ? key
        : keys[key] || store.keys[key]
    ;

    const save = () => {
        store.keys = {...keys, ...store.keys};
        const json = stringify(store);

        write(File.STORE, json);
    };

    const create = (key) => {
        let alias = _alias(key);

        if (!alias) {
            alias = next();
            keys[key] = alias;
        }

        const id = next();

        return [
            id,
            alias,
        ];
    };

    return {
        create,
        alias: _alias,
        save,
    };
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 01.05.2019
 * Time: 15:52
 */
module.exports = factory;