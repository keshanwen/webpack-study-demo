(self["webpackChunkzfrewrite"] = self["webpackChunkzfrewrite"] || []).push([["page2"],{

/***/ "./src/page2.js":
/*!**********************!*\
  !*** ./src/page2.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

let module1 = __webpack_require__(/*! ./module1 */ "./src/module1.js");
let module2 = __webpack_require__(/*! ./module2 */ "./src/module2.js");
let $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
console.log(module1, module2, $);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["defaultVendors-node_modules_jquery_dist_jquery_js","default-src_module1_js","default-src_module2_js"], () => (__webpack_exec__("./src/page2.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);