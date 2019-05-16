const {write, read} = require('./utils');
const {VALUES_FOLDER, VALUES_EXT} = require('./const');

const factory = (keys, resolver) => (id = null, key = null, value = null) => {
    const path = resolver(VALUES_FOLDER, id + VALUES_EXT);

    const entity = {
        id,
        key,
        value,
        dirty: false,
        permanent: value === null,
    };

    const save = () => {
        write(path, _value());

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

        entity.value = read(path);

        return true;
    };

    const remove = () => keys.remove(instance);

    const _id = () => entity.id;

    const _key = () => entity.key;

    const _value = (value = null) => {
        if (value) {
            entity.value = value;
            entity.dirty = true;
        }

        return entity.value;
    };

    const _dirty = (value = null) => {
        if (value !== null) {
            entity.dirty = value;
        }

        return entity.dirty;
    };

    const _permanent = () => entity.permanent;

    const instance = {
        load,
        save,
        remove,
        id: _id,
        key: _key,
        value: _value,
        dirty: _dirty,
        permanent: _permanent,
    };

    return instance;
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 01.05.2019
 * Time: 15:41
 */
module.exports = factory;