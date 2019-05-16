const {resolve} = require('path');
const entityFactory = require('./entity');
const storeFactory = require('./store');
const keyFactory = require('./key');
const stackFactory = require('./stack');

const factory = (path) => {

    const resolver = (...parts) => resolve(path, ...parts);

    const stack = stackFactory();
    const store = storeFactory(resolver);
    const keys = keyFactory(resolver);
    const createEntity = entityFactory(keys, resolver);

    const get = (id, alias) => {
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

    const create = (alias, value) => {
        if (typeof value !== 'string') {
            throw new Error('Non-string values are not allowed.');
        }

        const [_id, _alias] = store.create(alias);
        const entity = createEntity(_id, _alias, value);

        stack.set(entity, () => {
            store.save();
            entity.save();
        });

        return entity;
    };

    const commit = () => stack.commit();

    const flush = () => stack.flush();

    const fetch = (alias) => {
        const key = store.alias(alias);

        if (key && stack.ids(key)) {
            return stack.ids(key).map(id => stack.get(id));
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

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 05.04.2019
 * Time: 13:55
 */
module.exports = factory;
