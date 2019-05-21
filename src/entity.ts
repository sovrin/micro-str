import {read, write} from "./utils";
import {Extension, Folder} from "./enums";

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 01.05.2019
 * Time: 15:41
 *
 * @param keys
 * @param resolver
 */
export default (keys, resolver) => (id = null, key = null, value = null) => {
    const path = resolver(Folder.VALUES, id + Extension.VALUES);

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

    /**
     *
     */
    const save = () => {
        write(path, Method.value());

        if (!instance.permanent()) {
            entity.permanent = true;
            keys.save(instance);
        }

        if (!instance.dirty()) {
            return false;
        }

        return keys.update(instance);
    };

    /**
     *
     */
    const load = () => {
        if (!instance.permanent()) {
            return false;
        }

        entity.value = read(path);

        return true;
    };

    /**
     *
     */
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