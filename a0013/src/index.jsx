import React from "react";
import ReactDOM from "react-dom";

console.log(process.env.NODE_ENV,'process.env.NODE_ENV~~~index.js')

console.log("【app】", process.env);
const App = () => {
  return <div>app</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
