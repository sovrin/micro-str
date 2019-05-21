"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const enums_1 = require("./enums");
const INITIAL_STATE = {
    pointer: 0,
    keys: {},
};
exports.default = (resolver) => {
    const KEYS = resolver(enums_1.Folder.KEYS);
    const VALUES = resolver(enums_1.Folder.VALUES);
    const STORE = resolver(enums_1.File.STORE);
    const init = () => {
        utils_1.mkdir(KEYS);
        utils_1.mkdir(VALUES);
        const initial = utils_1.stringify(INITIAL_STATE);
        utils_1.write(STORE, initial);
    };
    if (!utils_1.exist(STORE)) {
        init();
    }
    let store = require(STORE);
    let keys = {};
    const next = () => ++store.pointer;
    const resolve = (key) => (typeof key === 'number')
        ? key
        : keys[key] || store.keys[key];
    const save = () => {
        store.keys = Object.assign({}, keys, store.keys);
        const json = utils_1.stringify(store);
        utils_1.write(STORE, json);
    };
    const create = (key) => {
        let alias = resolve(key);
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
        alias: resolve,
        save,
    };
};
