"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const enums_1 = require("./enums");
exports.default = (keys, resolver) => (id = null, key = null, value = null) => {
    const path = resolver(enums_1.Folder.VALUES, id + enums_1.Extension.VALUES);
    const entity = {
        id,
        key,
        value,
        dirty: false,
        permanent: value === null,
    };
    const Method = {
        id: () => entity.id,
        key: () => entity.key,
        value: (value = null) => {
            if (value) {
                entity.value = value;
                entity.dirty = true;
            }
            return entity.value;
        },
        dirty: (value = null) => {
            if (value !== null) {
                entity.dirty = value;
            }
            return entity.dirty;
        },
        permanent: () => entity.permanent,
    };
    const save = () => {
        utils_1.write(path, Method.value());
        if (!instance.permanent()) {
            entity.permanent = true;
            keys.save(instance);
        }
        if (!instance.dirty()) {
            return false;
        }
        return keys.update(instance);
    };
    const load = () => {
        if (!instance.permanent()) {
            return false;
        }
        entity.value = utils_1.read(path);
        return true;
    };
    const remove = () => keys.remove(instance);
    const instance = {
        load,
        save,
        remove,
        id: Method.id,
        key: Method.key,
        value: Method.value,
        dirty: Method.dirty,
        permanent: Method.permanent,
    };
    return instance;
};
