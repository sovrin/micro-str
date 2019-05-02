const {resolve} = require('path');

const valueFactory = require('./value');
const storeFactory = require('./store');
const keyFactory = require('./key');

const factory = (path) => {

    /**
     *
     * @param parts
     * @returns {string}
     */
    const resolver = (...parts) => resolve(path, ...parts);

    const store = storeFactory(resolver);
    const keys = keyFactory(resolver);
    const entityFactory = (keys) => valueFactory(keys, resolver);

    /**
     *
     * @param id
     * @param key
     * @returns {{pointer: (function(): *), load: load, save: save, value: (function(*=): *), remove: remove, key: (function(): *)}|null}
     */
    const get = (id, key) => {
        const entry = keys.get(key, id);

        if (!entry) {
            return null;
        }

        const entity = entityFactory(keys)
            .build(id, key)
        ;

        entity.load();

        return entity;
    };

    const create = (key, value) => {
        const [id, alias] = store.create(key);
        const entity = entityFactory(keys)
            .build(id, alias, value)
        ;

        entity.save();
        keys.save(entity);

        return entity;
    };

    /**
     *
     * @param key
     * @returns {*}
     */
    const fetch = (key) => {
        const alias = store.alias(key);
        const ids = keys.ids(alias);

        return ids.map((id) => {
            const entity = entityFactory(keys)
                .build(id, key)
            ;

            try {
                entity.load();
            } catch (e) {
                keys.remove({
                    id,
                    key,
                });
            }

            return entity;
        });
    };

    /**
     *
     */
    return {
        get,
        fetch,
        create,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.04.2019
 * Time: 13:55
 */
module.exports = factory;
