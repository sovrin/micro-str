import {exist, mkdir, stringify, write} from "./utils";
import {File, Folder} from "./enums";

const INITIAL_STATE = {
    pointer: 0,
    keys: {},
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 01.05.2019
 * Time: 15:52
 *
 * @param resolver
 */
export default (resolver: Function) => {
    const KEYS = resolver(Folder.KEYS);
    const VALUES = resolver(Folder.VALUES);
    const STORE = resolver(File.STORE);

    const init = () => {
        mkdir(KEYS);
        mkdir(VALUES);

        const initial = stringify(INITIAL_STATE);
        write(STORE, initial);
    };

    if (!exist(STORE)) {
        init();
    }

    let store = require(STORE);
    let keys = {};

    /**
     *
     */
    const next = () => ++store.pointer;

    /**
     *
     * @param key
     * @private
     */
    const resolve = (key: number|string) => (typeof key === 'number')
        ? key
        : keys[key] || store.keys[key]
    ;

    /**
     *
     */
    const save = () => {
        store.keys = {...keys, ...store.keys};
        const json = stringify(store);

        write(STORE, json);
    };

    /**
     *
     * @param key
     * @param strict
     */
    const create = (key: string, strict: boolean) => {
        let alias = resolve(key);

        if (!alias) {
            alias = next();
            keys[key] = alias;
        } else if (strict) {
            return null;
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