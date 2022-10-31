import { foo } from "./profile.js";

console.log(foo, 'foo~~~~~~~~~~~~~~~~')

setTimeout(() => {
    console.log(foo, 'foo~~~~~~~~~~~~~~~~setTimeout')
},2000)