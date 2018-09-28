(function() {
	var stream = document.getElementById('stream');

	if (stream) {
		stream.style.height = ((stream.offsetWidth * 9) / 16) + 'px';

		window.onresize = function() {
			stream.style.height = ((stream.offsetWidth * 9) / 16) + 'px';
		}
	}
})();