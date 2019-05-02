const del = require('del');
const gulp = require('gulp');

const mocha = require('gulp-mocha');

const clean = () => del(['./test/fixtures']);

const test = () => mocha({reporter: 'nyan'});

exports.clean = clean;
exports.test = gulp.series(clean, test);