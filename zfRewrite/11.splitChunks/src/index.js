document.querySelector("#play").addEventListener("click", () => {
  import("./hello.js").then((result) => {
    console.log(result.default);
  });
});
