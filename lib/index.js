"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const entity_1 = require("./entity");
const store_1 = require("./store");
const key_1 = require("./key");
const stack_1 = require("./stack");
exports.default = (path, strict = false) => {
    const resolver = (...parts) => path_1.resolve(path, ...parts);
    const stack = stack_1.default();
    const store = store_1.default(resolver);
    const keys = key_1.default(resolver);
    const createEntity = entity_1.default(keys, resolver);
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
    const commit = () => stack.commit();
    const flush = () => stack.flush();
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
