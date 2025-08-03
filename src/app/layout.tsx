// Import your global styles from the new src/styles folder.
import '../styles/App.scss';
// The preloader logic and helmet context should be handled in a client component.
import { PreloaderWrapper } from '@/components/PreloaderWrapper';
// Import your Header component.
import Header from '@/components/header/Header';

// Set your global metadata here, replacing the old PageHelmet.
export const metadata = {
	title: 'Your Site Title',
	description: 'Your site description.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<div id='page' className='page'>
					<div className='page-container'>
						<Header />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
