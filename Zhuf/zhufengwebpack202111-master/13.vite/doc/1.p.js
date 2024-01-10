let co = require("co");
function* p(arr) {
  if (arr.length === 0) return "";
  for (let i = 0; i < arr.length; i++) {
    yield arr[i] + p([...arr.slice(0, i), ...arr.slice(i + 1)]);
  }
}

let it = p(["a", "b", "c"]);
do {
  result = it.next();
  console.log(result.value);
} while (!result.done);
