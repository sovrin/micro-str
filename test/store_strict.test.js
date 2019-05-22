const {assert} = require('chai');

const storeFactory = require('../lib/index').default;
const PATH = __dirname + '/../test/store';
const {clean, prepare} = require('./utils');

describe('micro-str strict', () => {
    clean(PATH);
    prepare(PATH);

    const store = storeFactory(PATH, true);
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
        assert.isTrue(entities.length === 0);
    });

});

