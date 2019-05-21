declare const _default: (resolver: any) => {
    get: (key: string, id?: number) => any;
    ids: (key: string) => any;
    load: (key: string) => any;
    save: (entity: any) => boolean;
    remove: (entity: any) => boolean;
    update: (entity: any) => boolean;
};
export default _default;
