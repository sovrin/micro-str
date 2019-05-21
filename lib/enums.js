"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Extension;
(function (Extension) {
    Extension["KEYS"] = ".json";
    Extension["VALUES"] = ".v";
})(Extension = exports.Extension || (exports.Extension = {}));
var File;
(function (File) {
    File["STORE"] = "store.json";
})(File = exports.File || (exports.File = {}));
var Folder;
(function (Folder) {
    Folder["KEYS"] = "keys";
    Folder["VALUES"] = "values";
})(Folder = exports.Folder || (exports.Folder = {}));
var Value;
(function (Value) {
    Value[Value["TRUE"] = 1] = "TRUE";
    Value[Value["FALSE"] = 0] = "FALSE";
})(Value = exports.Value || (exports.Value = {}));
var Field;
(function (Field) {
    Field["ID"] = "i";
    Field["TYPE"] = "t";
    Field["DELETED"] = "d";
    Field["CREATED_AT"] = "c";
    Field["UPDATED_AT"] = "u";
})(Field = exports.Field || (exports.Field = {}));
