const {write} = require('./utils');
const {KEYS_FOLDER, KEYS_EXT, FIELD, VALUE} = require('./const');

const factory = (resolver) => {
    const path = (alias) => resolver(KEYS_FOLDER, alias + KEYS_EXT);

    /**
     *
     * @param key
     * @returns {Array}
     */
    const load = (key) => {
        const file = path(key);
        let keys;

        try {
            keys = require(file);
        } catch (e) {
            keys = [];
        }

        return keys;
    };


    /**
     *
     * @param entity
     */
    const save = (entity) => {
        const key = entity.key();
        const file = path(key);
        const keys = load(key);

        const entry = {
            [FIELD.ID]: entity.id(),
            [FIELD.DELETED]: VALUE.FALSE,
            [FIELD.CREATED_AT]: Date.now()
        };

        keys.push(entry);

        write(file, keys);
    };

    /**
     *
     * @param key
     * @param id
     */
    const remove = ({key, id}) => {
        const file = path(key);
        const keys = load(key);

        for (const entry of keys) {
            if (entry[FIELD.ID] === id) {
                entry[FIELD.DELETED] = VALUE.TRUE;
                entry[FIELD.UPDATED_AT] = Date.now();

                break;
            }
        }

        write(file, keys);
    };

    /**
     *
     * @param key
     * @param id
     */
    const update = ({key, id}) => {
        const file = path(key);
        const keys = load(key);
        let dirty = false;

        for (const entry of keys) {
            if (entry[FIELD.ID] === id) {
                entry[FIELD.UPDATED_AT] = Date.now();
                dirty = true;

                break;
            }
        }

        if (!dirty) {
            return;
        }

        write(file, keys);
    };

    /**
     *
     * @param key
     * @returns {*}
     */
    const ids = (key) => get(key).map(entry => entry[FIELD.ID]);

    /**
     *
     * @param key
     * @param id
     * @returns {*}
     */
    const get = (key, id = null) => {
        const keys = load(key);

        const entries = keys
            .filter(entry => entry[FIELD.DELETED] === VALUE.FALSE)
        ;

        if (id) {
            return entries.find((entry) => entry[FIELD.ID] === id);
        }

        return entries;
    };

    return {
        get,
        ids,
        load,
        save,
        remove,
        update
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.05.2019
 * Time: 17:45
 */
module.exports = factory;