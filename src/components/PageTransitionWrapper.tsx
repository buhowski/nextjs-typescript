// src/components/PageTransitionWrapper.tsx
'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
	// ref to the page div for CSSTransition
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();

	return (
		<TransitionGroup component={null}>
			{/* nodeRef gives CSSTransition a direct reference to the DOM node */}
			<CSSTransition key={pathname} nodeRef={nodeRef} classNames='slide' timeout={1100}>
				{/* must pass the ref to the direct child of CSSTransition */}
				<div ref={nodeRef} id='page' className='page'>
					<div className='page-container'>{children}</div>
				</div>
			</CSSTransition>
		</TransitionGroup>
	);
}
