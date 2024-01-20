module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feature",
        "update",
        "fixbug",
        "refactor",
        "optimize",
        "style",
        "docs",
        "chore",
      ]
    ],
  },
}