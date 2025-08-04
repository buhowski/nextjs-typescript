'use client';

import { ReactNode, createRef } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../styles/App.scss';
import Header from '@/components/header/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const nodeRef = createRef<HTMLDivElement>();

	return (
		<html lang='en'>
			<body>
				<TransitionGroup component={null}>
					<CSSTransition nodeRef={nodeRef} key={pathname} classNames='slide' timeout={1100}>
						<div ref={nodeRef} id='page' className='page'>
							<div className='page-container'>
								<Header />

								{children}
							</div>
						</div>
					</CSSTransition>
				</TransitionGroup>
			</body>
		</html>
	);
}
