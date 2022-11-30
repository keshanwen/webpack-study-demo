(function (modules) {
    let installedModules = {}

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }

        let module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

        module.l = true

        return module.exports
    }

    __webpack_require__.m = modules

    __webpack_require__.c = installedModules

    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty(object, property)
    }

    __webpack_require__.d = function(exports, name, getter) {
        if (__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
        }
    }

    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            })
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        })
    }

    __webpack_require__.n = function(module) {
        let getter = module && module.__esModule ?
            function getDefault() { return module['default'] } :
            function getModuleExports() { return module }

        __webpack_require__.d(getter, 'a', getter)
        
        return getter
    }

    __webpack_require__.p = ""

    return __webpack_require__(__webpack_require__.s = './src/index.js')

})
({
    "./src/index.js":
      (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.js */ "./src/login.js");
        console.log('index.js 执行了')
        console.log(_login_js__WEBPACK_IMPORTED_MODULE_0__["default"], '<------')
        console.log(_login_js__WEBPACK_IMPORTED_MODULE_0__["age"], '<------')
      }),
    "./src/login.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "age", function () { return age; });
        __webpack_exports__["default"] = ('zce是一个帅哥');
        const age = 40
      })

  })