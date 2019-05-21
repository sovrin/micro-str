"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const enums_1 = require("./enums");
exports.default = (resolver) => {
    const path = (alias) => resolver(enums_1.Folder.KEYS, alias + enums_1.Extension.KEYS);
    const load = (key) => {
        const file = path(key);
        let keys;
        try {
            keys = require(file);
        }
        catch (e) {
            keys = [];
        }
        return keys;
    };
    const save = (entity) => {
        const key = entity.key();
        const id = entity.id();
        const file = path(key);
        const keys = load(key);
        const entry = {
            [enums_1.Field.ID]: id,
            [enums_1.Field.DELETED]: enums_1.Value.FALSE,
            [enums_1.Field.CREATED_AT]: Date.now(),
        };
        keys.push(entry);
        const string = utils_1.stringify(keys);
        utils_1.write(file, string);
        return true;
    };
    const remove = (entity) => {
        const key = entity.key();
        const id = entity.id();
        const file = path(key);
        const keys = load(key);
        let dirty = false;
        for (const entry of keys) {
            if (entry[enums_1.Field.ID] === id) {
                entry[enums_1.Field.DELETED] = enums_1.Value.TRUE;
                entry[enums_1.Field.UPDATED_AT] = Date.now();
                dirty = true;
                break;
            }
        }
        if (!dirty) {
            return false;
        }
        const string = utils_1.stringify(keys);
        utils_1.write(file, string);
        return true;
    };
    const update = (entity) => {
        const key = entity.key();
        const id = entity.id();
        const file = path(key);
        const keys = load(key);
        let dirty = false;
        for (const entry of keys) {
            if (entry[enums_1.Field.ID] === id) {
                entry[enums_1.Field.UPDATED_AT] = Date.now();
                dirty = true;
                break;
            }
        }
        if (!dirty) {
            return false;
        }
        const string = utils_1.stringify(keys);
        utils_1.write(file, string);
        return true;
    };
    const ids = (key) => get(key).map(entry => entry[enums_1.Field.ID]);
    const get = (key, id = 0) => {
        const keys = load(key);
        const entries = keys
            .filter(entry => entry[enums_1.Field.DELETED] === enums_1.Value.FALSE);
        if (id !== 0) {
            return entries.find((entry) => entry[enums_1.Field.ID] === id);
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
