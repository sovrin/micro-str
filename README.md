<h1 align="left">micro-str</h1>

string storage

***
# Installation

```bash
$ npm i micro-str
```

# About
micro-str is a small and opinionated string(/json) storage library featuring soft-deletion without any additional dependencies.

# `store` functions
## get(id, alias) 
retrieve the the with the id
* <= `id` (number); id of the entity 
* <= `alias` (string); alias/key of the entity
* => `entity`

## fetch(alias)
Fetch all entities with the given key
* <= `alias` (string); name of the key
* => `entity[]`

## create(key, value) 
create an entity with key and value
* <= `key` (string); name of the key
* <= `value` (string); value to save as an entity
* => `entity`

## commit()
permanently save the previously created entities
* <= `key` (string); name of the key
* <= `value` (string); value to save as an entity
* => `Boolean`; if false, saving entities failed

## flush() 
delete all not-saved newly created entities
* => `undefined`

# `entity` functions
## load()
load permanently saved value from disk
* => `Boolean`; if false, entity is not saved permanently == nothing to load

## save()
permanently save the entity to the disk
* => `Boolean`; if false, there is nothing to save or value === old value

## remove()
softdelete entity from store
* => `Boolean`; if false, nothing got softdeleted

## id()
get id of entity
* => `Number`

## key()
get key of entity
* => `string`

## value(value = null)
if value parameter empty, get current value, else set new value
* <= `value` (string); desired value
* => `string`; the old or set value

## dirty(value = null)
if value parameter empty, get current dirty flag, else set dirty flag
(dirty entities are altered and are not the same as the actual values on the disk. non-dirty entities are excluded from the save process)
* <= `value` (string); desired value
* => `string`

## permanent()
get the current state of the entity. if true, the entity is saved to the disk.
* => `Boolean`

# Examples
```JavaScript
const storeFactory = require('micro-str');
const store = storeFactory('./store');

store.create('foo', 'bar');
store.create('foo', 'baz');
store.commit();

const entities = store.fetch('foo');

for(const entity of entities) {
    console.log(entity.value())
}

```