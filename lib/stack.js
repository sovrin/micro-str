const factory = () => {
    let stack = {};
    let pool = {};

    const set = (entity, callback) => {
        const key = entity.key();
        const id = entity.id();

        if (!stack[key]) {
            stack[key] = {};
        }

        const unset = () => {
            delete pool[id];
            delete stack[key][id];
        };

        pool[id] = key;
        stack[key][id] = {entity, callback, unset};
    };

    const get = (id) => {
        const key = pool[id];

        if (!stack[key]) {
            return null;
        }

        return stack[key][id] && stack[key][id].entity;
    };

    const ids = (key) => stack[key] && Object.keys(stack[key]);

    const commit = () => {
        const aliases = Object.keys(stack);

        try {
            for (const alias of aliases) {
                const ids = Object.keys(stack[alias]);

                for (const id of ids) {
                    const {callback, entity, unset} = stack[alias][id];

                    if (entity.permanent()) {
                        continue;
                    }

                    callback();
                    unset();
                }
            }
        } catch (e) {
            return false;
        }

        flush();

        return true;
    };

    const flush = () => {
        stack = {};
        pool = {};
    };

    return {
        set,
        get,
        ids,
        commit,
        flush,
    };
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 08.05.2019
 * Time: 18:52
 */
module.exports = factory;
