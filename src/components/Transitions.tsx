'use client';
import { usePathname } from 'next/navigation';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Transitions = ({ children }) => {
	const pathname = usePathname();
	return (
		<TransitionGroup>
			<CSSTransition key={pathname} classNames='slide' timeout={1100}>
				{children}
			</CSSTransition>
		</TransitionGroup>
	);
};

export default Transitions;
