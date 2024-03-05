"use strict";

require("@babel/polyfill");
require("core-js/stable");
// do expressions stage-1语法
var x = 100;
var y = 20;
var a = x > 10 ? y > 20 ? "big x, big y" : "big x, small y" : y > 10 ? "small x, big y" : "small x, small y";