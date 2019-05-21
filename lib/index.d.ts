declare const _default: (path: string) => {
    get: (id: number, alias: string) => any;
    fetch: (alias: any) => any;
    create: (alias: string, value: string) => {
        load: () => boolean;
        save: () => any;
        remove: () => any;
        id: () => any;
        key: () => any;
        value: (value?: any) => any;
        dirty: (value?: any) => boolean;
        permanent: () => boolean;
    };
    commit: () => boolean;
    flush: () => void;
};
export default _default;
