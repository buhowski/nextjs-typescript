'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { startupsNav } from '../../../components/urlsData';

const StartupNavigation: React.FC = () => {
	const pathname = usePathname();

	return (
		<div className='idea-tabs idea-tabs--urls'>
			{startupsNav.map(({ pageLink, pageName }, index) => {
				const isActive = pathname === pageLink;

				return (
					<Link
						href={pageLink}
						className={`idea-tabs__btn ${isActive ? 'active' : ''}`}
						key={index}
					>
						{pageName}
					</Link>
				);
			})}
		</div>
	);
};

export default StartupNavigation;
