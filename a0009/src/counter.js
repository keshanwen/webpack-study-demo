function counter() {
	var div = document.createElement('div');
	div.setAttribute('id', 'counter');
	div.innerHTML = 1;
	div.onclick = function() {
		div.innerHTML = parseInt(div.innerHTML, 10) + 1
	}
	document.body.appendChild(div);
	console.log('counter~~~~')
}

export default counter;