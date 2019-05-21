import {stringify, write} from "./utils";
import {Extension, Folder, Field, Value} from "./enums";

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 01.05.2019
 * Time: 17:45
 *
 * @param resolver
 */
export default (resolver) => {
    /**
     *
     * @param alias
     */
    const path = (alias: string) => resolver(Folder.KEYS, alias + Extension.KEYS);

    /**
     *
     * @param key
     */
    const load = (key: string) => {
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
        const id = entity.id();

        const file = path(key);
        const keys = load(key);

        const entry = {
            [Field.ID]: id,
            [Field.DELETED]: Value.FALSE,
            [Field.CREATED_AT]: Date.now(),
        };

        keys.push(entry);
        const string = stringify(keys);

        write(file, string);

        return true;
    };

    /**
     *
     * @param entity
     */
    const remove = (entity) => {
        const key = entity.key();
        const id = entity.id();

        const file = path(key);
        const keys = load(key);
        let dirty = false;

        for (const entry of keys) {
            if (entry[Field.ID] === id) {
                entry[Field.DELETED] = Value.TRUE;
                entry[Field.UPDATED_AT] = Date.now();
                dirty = true;

                break;
            }
        }

        if (!dirty) {
            return false;
        }

        const string = stringify(keys);

        write(file, string);

        return true;
    };

    /**
     *
     * @param entity
     */
    const update = (entity) => {
        const key = entity.key();
        const id = entity.id();

        const file = path(key);
        const keys = load(key);
        let dirty = false;

        for (const entry of keys) {
            if (entry[Field.ID] === id) {
                entry[Field.UPDATED_AT] = Date.now();
                dirty = true;

                break;
            }
        }

        if (!dirty) {
            return false;
        }

        const string = stringify(keys);

        write(file, string);

        return true;
    };

    /**
     *
     * @param key
     */
    const ids = (key: string) => get(key).map(entry => entry[Field.ID]);

    /**
     *
     * @param key
     * @param id
     */
    const get = (key: string, id: number = 0) => {
        const keys = load(key);

        const entries = keys
            .filter(entry => entry[Field.DELETED] === Value.FALSE)
        ;

        if (id !== 0) {
            return entries.find((entry) => entry[Field.ID] === id);
        }

        return entries;
    };

    return {
        get,
        ids,
        load,
        save,
        remove,
        update,
    };
};