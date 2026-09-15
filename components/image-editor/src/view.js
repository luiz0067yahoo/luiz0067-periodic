/**
 * Script de Frontend: Periodic Image Editor
 */
document.addEventListener('DOMContentLoaded', () => {
	const frames = document.querySelectorAll('.periodic-image-frame');
	frames.forEach(frame => {
		const img = frame.querySelector('.periodic-transformed-img');
		if (img) {
			img.addEventListener('load', () => {
				frame.classList.add('is-loaded');
			});
		}
	});
});
