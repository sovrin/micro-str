const {write, exist, mkdir} = require('./utils');
const {KEYS_FOLDER, VALUES_FOLDER, STORE_FILE, INITIAL_STATE} = require('./const');


const factory = (resolver) => {
    const Path = {
        TABLES: resolver(KEYS_FOLDER),
        ENTITIES: resolver(VALUES_FOLDER),
    };

    const File = {
        STORE: resolver(STORE_FILE),
    };

    /**
     *
     */
    const init = () => {
        mkdir(Path.TABLES);
        mkdir(Path.ENTITIES);

        write(File.STORE, INITIAL_STATE);
    };

    if (!exist(File.STORE)) {
        init();
    }

    const store = require(File.STORE);

    /**
     *
     * @returns {number}
     */
    const next = () => ++store.pointer;

    /**
     *
     * @param key
     * @returns {*}
     */
    const alias = (key) => store.keys[key];

    /**
     *
     * @param key
     * @returns {number[]}
     */
    const create = (key) => {
        let alias = store.keys[key];

        if (!alias) {
            alias = next();
            store.keys[key] = alias;
        }

        const id = next();

        write(File.STORE, store);

        return [
            id,
            alias,
        ];
    };

    return {
        create,
        alias,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.05.2019
 * Time: 15:52
 */
module.exports = factory;