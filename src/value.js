const {write, read} = require('./utils');
const {VALUES_FOLDER, VALUES_EXT} = require('./const');

const factory = (keys, resolver) => {

    /**
     *
     * @param id
     * @param key
     * @param value
     * @returns {{load: load, save: save, id: (function(): *), value: (function(*=): *), remove: remove, key: (function(): *)}}
     */
    const build = (id = null, key = null, value = null) => {
        const path = resolver(VALUES_FOLDER, id + VALUES_EXT);

        const entity = {
            id,
            key,
            value,
            dirty: false,
        };

        /**
         *
         */
        const save = () => {
            const {value, dirty} = entity;
            write(path, value);

            if (!dirty) {
                return;
            }

            keys.update(entity);
        };

        /**
         *
         */
        const load = () => {
            entity.value = read(path, true);
        };

        /**
         *
         */
        const remove = () => {
            keys.remove(entity);
        };

        /**
         *
         * @returns {Number}
         */
        const _id = () => entity.id;

        /**
         *
         * @returns {string}
         */
        const _key = () => entity.key;

        /**
         *
         * @returns {*}
         */
        const _value = (value = null) => {
            if (value) {
                entity.value = value;
                entity.dirty = true;
            }

            return entity.value;
        };

        return {
            load,
            save,
            remove,
            id: _id,
            key: _key,
            value: _value,
        };
    };

    return {
        build,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.05.2019
 * Time: 15:41
 */
module.exports = factory;