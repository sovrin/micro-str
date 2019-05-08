const factory = () => {
    let stack = {};

    const set = (entity, callback) => {
        const key = entity.key();
        const id = entity.id();

        if (!stack[key]) {
            stack[key] = {};
        }

        const unset = () => {
            delete stack[key][id];
        };

        stack[key][id] = {entity, callback, unset};
    };

    const get = (key, id = null) => {
        if (!stack[key]) {
            return null;
        }

        if (stack[key] && id === null) {
            return Object.keys(stack[key]);
        }

        return stack[key][id] && stack[key][id].entity;
    };

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
    };

    return {
        set,
        get,
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