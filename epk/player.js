(function() {
	var players = document.querySelectorAll('audio'),
		template = `<button class="audio-play"><span class="glyphicon glyphicon-play"></span></button>
				<div class="audio-progress">
					<div class="audio-progress-indicator"></div>
					<div class="audio-scrubber"></div>
				</div>`,
		playIcon = `<span class="glyphicon glyphicon-play"></span>`,
		pauseIcon = `<span class="glyphicon glyphicon-pause"></span>`,
		pauseAllOthers = function(exception) {
			players.forEach(function(player) {
				if (exception !== player) {
					player.pause();
				}
			});
		};

	players.forEach(function(player) {
		var controls = document.createElement('div'),
			playButton,
			pauseButton,
			progress,
			progressIndicator,
			scrubber,
			dragging = false;

		controls.innerHTML = template;
		controls.className = 'audio-controls';

		playButton = controls.querySelector('.audio-play');
		pauseButton = controls.querySelector('.audio-pause');
		progress = controls.querySelector('.audio-progress');
		progressIndicator = controls.querySelector('.audio-progress-indicator');
		scrubber = controls.querySelector('.audio-scrubber');

		if (player.nextSibling) {
			player.parentNode.insertBefore(controls, player.nextSibling);
		} else {
			player.parentNode.appendChild(controls);
		}

		playButton.addEventListener('click', function() {
			if (player.paused) {
				pauseAllOthers(player);
				player.play();
				playButton.classList.add('audio-playing');
				playButton.innerHTML = pauseIcon;
			} else {
				player.pause();
				playButton.classList.remove('audio-paused');
				playButton.innerHTML = playIcon;
			}
		});

		player.addEventListener('timeupdate', function() {
			var position = (player.currentTime / player.duration) * 100;

			if (!dragging) {
				progressIndicator.style.width = position + '%';
			}
		});

		progress.addEventListener('mousedown', function(e) {
			var clickX = e.clientX,
				barX = progress.offsetLeft,
				barWidth = progress.offsetWidth,
				relativeX = clickX - barX,
				percent = (relativeX / barWidth),
				targetTime = player.duration * percent;

			dragging = true;

			progressIndicator.style.width = (percent * 100) + '%';
		});

		document.body.addEventListener('mousemove', function(e) {
			var clickX = e.clientX,
				barX = progress.offsetLeft,
				barWidth = progress.offsetWidth,
				relativeX = clickX - barX,
				percent = Math.max(0, Math.min(1, relativeX / barWidth));

			
			if (dragging) {
				progressIndicator.style.width = (percent * 100) + '%';
			}
		});

		document.body.addEventListener('mouseup', function(e) {
			var clickX = e.clientX,
				barX = progress.offsetLeft,
				barWidth = progress.offsetWidth,
				relativeX = clickX - barX,
				percent = (relativeX / barWidth),
				targetTime = Math.max(0, Math.min(player.duration, player.duration * percent));

			if (dragging) {
				player.currentTime = targetTime;
				progressIndicator.style.width = (percent * 100) + '%';
				dragging = false;
			}
		});

		progress.addEventListener('click', function(e) {
			var clickX = e.clientX,
				barX = progress.offsetLeft,
				barWidth = progress.offsetWidth,
				relativeX = clickX - barX,
				percent = (relativeX / barWidth),
				targetTime = player.duration * percent;

			player.currentTime = targetTime;
			progressIndicator.style.width = (percent * 100) + '%';

			dragging = false;
		});
	});
})();