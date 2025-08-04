'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Use this component instead of next/link.
// It will handle the page transition animation.
const AnimatedLink = ({
	href,
	children,
	...props
}: {
	href: string;
	children: React.ReactNode;
}) => {
	const router = useRouter();

	// Handles the click event for the link.
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		// Add your animation logic here if needed.
		// For example, add a class to the body or a specific element.
		document.body.classList.add('page-transition-start');

		// Delay navigation to match your CSS transition time.
		setTimeout(() => {
			router.push(href);
		}, 700);
	};

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
};

export default AnimatedLink;
