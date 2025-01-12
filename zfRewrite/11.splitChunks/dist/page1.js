(self["webpackChunkzfrewrite"] = self["webpackChunkzfrewrite"] || []).push([["page1"],{

/***/ "./src/page1.js":
/*!**********************!*\
  !*** ./src/page1.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

let module1 = __webpack_require__(/*! ./module1 */ "./src/module1.js");
let module2 = __webpack_require__(/*! ./module2 */ "./src/module2.js");
let $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
console.log(module1, module2, $);
Promise.all(/*! import() | asyncModule1 */[__webpack_require__.e("defaultVendors-node_modules_lodash_lodash_js"), __webpack_require__.e("asyncModule1")]).then(__webpack_require__.bind(__webpack_require__, /*! ./asyncModule1 */ "./src/asyncModule1.js"));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["defaultVendors-node_modules_jquery_dist_jquery_js","default-src_module1_js","default-src_module2_js"], () => (__webpack_exec__("./src/page1.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);