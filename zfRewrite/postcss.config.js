let postcssPresetEnv = require("postcss-preset-env"); // postcss-preset-env把现代的CSS转换成大多数浏览器能理解的

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: "last 5 version",
    }),
  ],
};
