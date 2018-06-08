(function() {
	document.body.onclick = function(e) {
		var target = e.target || e.srcElement,
			article;

		if (target.rel === 'readmore') {
			target.parentNode.querySelector('.more').style.display = 'block';
			target.rel = 'readless';
			target.innerText = 'Show Less';
			return false;
		} else if (target.rel === 'readless') {
			target.parentNode.querySelector('.more').style.display = 'none';
			target.rel = 'readmore';
			target.innerText = 'Read More...';
			return false;
		}
	}
})();