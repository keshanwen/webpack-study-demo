const moduleRegex = /\/node_modules\/\.vite\/(.+?)\.js/;
let result = `/node_modules/.vite/vue.js`.match(moduleRegex);
let moduleName = result[1];
console.log(moduleName);