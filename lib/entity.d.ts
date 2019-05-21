declare const _default: (keys: any, resolver: any) => (id?: any, key?: any, value?: any) => {
    load: () => boolean;
    save: () => any;
    remove: () => any;
    id: () => any;
    key: () => any;
    value: (value?: any) => any;
    dirty: (value?: any) => boolean;
    permanent: () => boolean;
};
export default _default;
