import {resolve} from "path";
import entityFactory from "./entity";
import storeFactory from "./store";
import keyFactory from "./key";
import stackFactory from "./stack";

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 05.04.2019
 * Time: 13:55
 *
 * @param path
 * @param strict
 */
export default (path: string, strict: boolean = false) => {
    const resolver = (...parts: Array<string>) => resolve(path, ...parts);

    const stack = stackFactory();
    const store = storeFactory(resolver);
    const keys = keyFactory(resolver);
    const createEntity = entityFactory(keys, resolver);

    /**
     *
     * @param id
     * @param alias
     */
    const get = (id: number, alias: string) => {
        const key = store.alias(alias);

        if (stack.get(id, key)) {
            return stack.get(id, key);
        }

        const ref = keys.get(key, id);

        if (!ref) {
            return null;
        }

        const entity = createEntity(id, key);
        entity.load();

        return entity;
    };

    /**
     *
     * @param alias
     * @param value
     */
    const create = (alias: string, value: string) => {
        const pointers = store.create(alias, strict);

        if (!pointers) {
            return null;
        }

        const entity = createEntity(...pointers, value);

        stack.set(entity, () => {
            store.save();
            entity.save();
        });

        return entity;
    };

    /**
     *
     */
    const commit = () => stack.commit();

    /**
     *
     */
    const flush = () => stack.flush();

    /**
     *
     * @param alias
     */
    const fetch = (alias) => {
        const key = store.alias(alias);

        if (key && stack.ids(key)) {
            return stack.ids(key).map(id => stack.get(id, key));
        }

        const ids = keys.ids(key);

        return ids.map((id) => {
            const entity = createEntity(id, key);
            entity.load();

            return entity;
        });
    };

    return {
        get,
        fetch,
        create,
        commit,
        flush,
    };
};