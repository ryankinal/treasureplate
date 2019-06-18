(function() {
	var stream = document.querySelector('#stream .slide .media');
	if (stream) {
		document.querySelector('#stream').style.height = ((stream.offsetWidth * 9) / 16) + 'px';
		stream.style.height = ((stream.offsetWidth * 9) / 16) + 'px';

		window.addEventListener('resize', function() {
			document.querySelector('#stream').style.height = ((stream.offsetWidth * 9) / 16) + 40 + 'px';
			stream.style.height = ((stream.offsetWidth * 9) / 16) + 'px';
		});
	}
})();