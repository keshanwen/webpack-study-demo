// 先不引入regenerator-runtime/runtime

// import 'regenerator-runtime/runtime';
const sleep = async function() {
    setTimeout(() => console.log('get up'), 1000);
}
sleep();
