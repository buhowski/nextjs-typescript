// src/pages/home/DrawCanvas.tsx
'use client';

import { useEffect } from 'react';
// Import images and access their src property.
import myImage from '../../assets/images/photo.png';
import illustrationImage from '../../assets/images/photo-drawing.png';

interface Point {
	time: number;
	x: number;
	y: number;
}

const DrawCanvas = () => {
	useEffect(() => {
		const imageCanvas: HTMLCanvasElement | null = document.createElement('canvas');
		const lineCanvas: HTMLCanvasElement | null = document.createElement('canvas');
		const imageCanvasContext = imageCanvas?.getContext('2d');
		const lineCanvasContext = lineCanvas?.getContext('2d');
		const pointLifetime = 1000;
		let points: Point[] = [];

		// The image element needs to be created dynamically for reliable loading.
		const image = new window.Image();
		image.src = illustrationImage.src; // Use the .src property.

		// The background image for the div is a CSS property, so no change needed.
		const start = () => {
			// Your existing start function.
			imageCanvas?.addEventListener('mousemove', onMouseMove);
			imageCanvas?.addEventListener('touchmove', onTouchMove, { passive: true });
			window.addEventListener('resize', resizeCanvases);
			document.querySelector('.drawCanvas')?.appendChild(imageCanvas);

			resizeCanvases();
			tick();
		};

		const onMouseMove = (event: MouseEvent) => {
			const rect = imageCanvas?.getBoundingClientRect();

			if (rect) {
				points.push({
					time: Date.now(),
					x: event.pageX - rect.left,
					y: event.pageY - rect.top,
				});
			}
		};

		const onTouchMove = (event: TouchEvent) => {
			const touch = event.targetTouches[0];
			const rect = imageCanvas?.getBoundingClientRect();

			if (rect) {
				points.push({
					time: Date.now(),
					x: touch.pageX - rect.left,
					y: touch.pageY - rect.top,
				});
			}
		};

		const resizeCanvases = () => {
			const photoContainer = document.querySelector('.photoContainer') as HTMLElement;

			if (imageCanvas && lineCanvas && photoContainer) {
				imageCanvas.width = lineCanvas.width = photoContainer.offsetWidth || 0;
				imageCanvas.height = lineCanvas.height = photoContainer.offsetHeight || 0;
			}
		};

		const tick = () => {
			points = points.filter((point) => {
				const age = Date.now() - point.time;
				return age < pointLifetime;
			});

			drawLineCanvas();
			drawImageCanvas();
			requestAnimationFrame(tick);
		};

		const drawLineCanvas = () => {
			// ... (no changes here) ...
			const minimumLineWidth = 90;
			const maximumLineWidth = 90;
			const lineWidthRange = maximumLineWidth - minimumLineWidth;
			const maximumSpeed = 200;

			if (lineCanvasContext) {
				lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
				lineCanvasContext.lineCap = 'round';

				for (let i = 1; i < points.length; i++) {
					const point = points[i];
					const previousPoint = points[i - 1];

					const distance = getDistanceBetween(point, previousPoint);
					const speed = Math.max(0, Math.min(maximumSpeed, distance));
					const percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
					lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

					const age = Date.now() - point.time;
					const opacity = (pointLifetime - age) / pointLifetime;
					lineCanvasContext.strokeStyle = `rgba(0, 0, 0, ${opacity}`;

					lineCanvasContext.beginPath();
					lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
					lineCanvasContext.lineTo(point.x, point.y);
					lineCanvasContext.stroke();
				}
			}
		};

		const getDistanceBetween = (a: Point, b: Point) => {
			return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		};

		const drawImageCanvas = () => {
			if (imageCanvasContext && image) {
				const drawCanvasElement = document.querySelector('.drawCanvas') as HTMLElement;

				if (drawCanvasElement) {
					imageCanvas.width = drawCanvasElement.offsetWidth || 0;
					imageCanvas.height = drawCanvasElement.offsetHeight || 0;
				}

				let width = imageCanvas.width;
				let height = (imageCanvas.width / image.naturalWidth) * image.naturalHeight;

				if (height < imageCanvas.height) {
					width = (imageCanvas.height / image.naturalHeight) * image.naturalWidth;
					height = imageCanvas.height;
				}

				imageCanvasContext.clearRect(0, 0, width, height);
				imageCanvasContext.globalCompositeOperation = 'source-over';
				imageCanvasContext.drawImage(image, 0, 0, width, height);
				imageCanvasContext.globalCompositeOperation = 'destination-in';
				imageCanvasContext.drawImage(lineCanvas, 0, 0);
			}
		};

		// Wait for the image to load.
		if (image.complete) {
			start();
		} else {
			image.onload = start;
		}
	}, []);

	return (
		<div className='photoContainer'>
			{/* Use the .src property for the background image style */}
			<div className='drawCanvas' style={{ backgroundImage: `url(${myImage.src})` }}>
				{/* We can remove this img tag now since the image is handled in the useEffect hook.
        <img
          className='illustrationImage'
          src={illustrationImage.src}
          alt='Hand-drawn digital portrait illustration of Tsiomakh Olexandr (Цьомах Олександр Віталійович), Frontend Developer, Writer, and Screenwriter'
        /> */}
			</div>
		</div>
	);
};

export default DrawCanvas;
