(function() {
	var timeout = 750,
		links = document.querySelectorAll('[rel=lightbox]'),
		blanket = document.getElementById('blanket'),
		closeLink = document.createElement('a'),
		closeFunc = function() {
			shownElem.className = 'lightbox lightbox-show lightbox-fade-out';
			blanket.className = 'blanket blanket-show blanket-fade-out';

			setTimeout(function() {
				shownElem.className = 'lightbox';
				blanket.className = 'blanket';
			}, timeout)
		},
		buildclick = function(target) {
			var id = target.href.split('#')[1],
				elem = document.getElementById(id);

			if (elem) {
				return function() {
					if (shownElem) {
						shownElem.className = 'lightbox';
					}
					blanket.className = 'blanket blanket-show';
					elem.className = 'lightbox lightbox-show';

					setTimeout(function() {
						blanket.className = 'blanket blanket-show blanket-fade-in';
						elem.className = 'lightbox lightbox-show lightbox-fade-in'
					}, 10)

					elem.appendChild(closeLink);
					shownElem = elem;
					return false;
				}
			} else {
				return function() {
					return false;
				}
			}			
		},
		shownElem,
		i;

	closeLink.className = 'lightbox-close';
	closeLink.appendChild(document.createTextNode('close X'));

	for (i = 0; i < links.length; i++) {
		links[i].onclick = buildclick(links[i]);
	}

	blanket.onclick = closeFunc;
	closeLink.onclick = closeFunc;
})();