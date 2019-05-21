"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { writeFileSync, readFileSync, mkdirSync: mkdir, existsSync: exist, } = require('fs');
exports.mkdir = mkdir;
exports.exist = exist;
exports.stringify = (object) => JSON.stringify(object);
exports.write = (path, value) => writeFileSync(path, value, 'utf-8');
exports.read = (file) => readFileSync(file, 'utf-8');
