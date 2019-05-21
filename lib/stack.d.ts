declare const _default: () => {
    set: (entity: any, callback: any) => void;
    get: (id: any, key: any) => any;
    ids: (key: any) => string[];
    commit: () => boolean;
    flush: () => void;
};
export default _default;
