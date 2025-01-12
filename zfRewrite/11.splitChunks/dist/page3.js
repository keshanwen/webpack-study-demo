(self["webpackChunkzfrewrite"] = self["webpackChunkzfrewrite"] || []).push([["page3"],{

/***/ "./src/module3.js":
/*!************************!*\
  !*** ./src/module3.js ***!
  \************************/
/***/ (() => {

console.log("module3");


/***/ }),

/***/ "./src/page3.js":
/*!**********************!*\
  !*** ./src/page3.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

let module1 = __webpack_require__(/*! ./module1 */ "./src/module1.js");
let module3 = __webpack_require__(/*! ./module3 */ "./src/module3.js");
let $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
console.log(module1, module3, $);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["defaultVendors-node_modules_jquery_dist_jquery_js","default-src_module1_js"], () => (__webpack_exec__("./src/page3.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);