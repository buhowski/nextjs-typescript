'use client';
import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export const PreloaderWrapper = () => {
	const [showPreloader, setShowPreloader] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowPreloader(false);
			document.body.classList.add('is-ready');
		}, 800);

		return () => {
			clearTimeout(timer);
			document.body.classList.remove('is-ready');
		};
	}, []);

	return showPreloader && <Preloader />;
};
