const {assert} = require('chai');

const storeFactory = require('../lib/index').default;
const PATH = __dirname + '/../test/store_strict';
const {clean, prepare} = require('./utils');

describe('micro-str', () => {
    clean(PATH);
    prepare(PATH);

    const store = storeFactory(PATH);
    const key = 'foo';

    it('should be empty', () => {
        const entities = store.fetch(key);

        assert.isArray(entities);
        assert.isEmpty(entities);
    });

    it('should create return entity', () => {
        const entity = store.create(key, 'test');

        assert.isObject(entity);
        assert.equal(entity.value(), 'test');
    });

    it('should get the desired entity', () => {
        const entity = store.get(2, key);

        assert.isObject(entity);
        assert.equal(entity.value(), 'test');
    });

    it('should return one entity', async () => {
        const entities = store.fetch(key);

        assert.isArray(entities);
        assert.isNotEmpty(entities);
        assert.isTrue(entities.length === 1)
    });

    it('should return no entities', async () => {
        store.flush();

        const entities = store.fetch(key);

        assert.isArray(entities);
        assert.isEmpty(entities);
    });

    it('should save entities to file', async () => {
        store.create(key, 'foo');
        store.create(key, 'bar');
        store.commit();

        const entities = store.fetch(key);

        assert.isArray(entities);
        assert.isNotEmpty(entities);
        assert.isTrue(entities.length === 2);

        assert.isTrue(entities[0].value() === 'foo');
        assert.isTrue(entities[1].value() === 'bar');
    });

    it('should not load from file', async () => {
        const entity = store.create(key, 'value');
        const loadedFromFile = entity.load();

        assert.isFalse(loadedFromFile);
    });

    it('should load from file', async () => {
        const entity = store.create(key, 'value');
        store.commit();

        const loadedFromFile = entity.load();

        assert.isTrue(loadedFromFile);
    });

    it('should save new value', async () => {
        const entity = store.create(key, 'value');
        entity.value('newvalue');

        assert.equal(entity.value(), 'newvalue');
        entity.save();
    });

    it('should not be able to remove uncommited entity', async () => {
        const entity = store.create(key, 'foo');
        const removed = entity.remove();

        assert.isFalse(removed);
    });

    it('should remove commited entity', async () => {
        const entity = store.create(key, 'foo');
        store.commit();

        const removed = entity.remove();

        assert.isTrue(removed);

        const fetched = store.get(entity.id());
        assert.isNull(fetched);
    });

    it('should get entity', async () => {
        const entity = store.create(key, 'footest');
        store.commit();

        const stored = store.get(entity.id(), entity.key());

        assert.equal(entity.value(), stored.value());
    });
});

