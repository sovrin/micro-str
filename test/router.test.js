const chai = require('chai');
const chaiFs = require('chai-fs');
chai.use(chaiFs);

const {expect} = chai;

const storeFactory = require('../index');
const PATH = __dirname + '/../test/store';

describe('micro-str', () => {
    const store = storeFactory(PATH);

    before(() => {
        console.log('');
    });

    // store.create('foo', 'bar');

    it('', () => {
        expect('tests/store.json').to.be.a.file();
    });

    // let entities = store.fetch('foo');
    //
    // for (const entity of entities) {
    //     console.info(entity.value());
    // }
    //
});

