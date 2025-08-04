import Home from '@/pages/home/Home';

export const metadata = {
	title: 'Olexander Tsiomakh: Developer | Explorer | Creator',
	description:
		'Building awesome products and contributing useful solutions to the world. Based on Planet Earth, Solar System.',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	themeColor: '#202020',
	openGraph: {
		title: 'Developer | Explorer | Creator',
		description:
			'Building awesome products and contributing useful solutions to the world. Based on Planet Earth, Solar System.',
		url: 'https://buhowski.dev/',
		siteName: 'Olexander Tsiomakh',
		images: [
			{
				url: 'https://buhowski.dev/screenshot.png',
				width: 1280,
				height: 640,
				alt: 'Olexander Tsiomakh',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Developer | Explorer | Creator',
		description:
			'Building awesome products and contributing useful solutions to the world. Based on Planet Earth, Solar System.',
		creator: '@buhowski',
		site: '@buhowski',
		images: ['https://buhowski.dev/screenshot.png'],
	},
	authors: [{ name: 'Olexander Tsiomakh' }],
	keywords: [
		'Olexander Tsiomakh',
		'Цьомах Олександр Віталійович',
		'Design',
		'Develop',
		'Startups',
		'buhowski',
	],
};

export default function HomePage() {
	return <Home />;
}
