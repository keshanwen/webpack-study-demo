document.addEventListener('click', () =>{
	import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
		func();
	})
});
// prefetching 在主要代码拉取完之后，在去进行加载
// preloading 会和主要代码一起加载
// 在进行前端性能优化时，代码利用率是一个重要的点，多进行异步加载代码，使用prefetching
// 对于一些交换的代码，可以使用prefetch加载的方式