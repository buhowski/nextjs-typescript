// Mark as a client component.
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { pathToStartup, pathToAbout, pathToProjects } from '../urlsData';
import { useTabletQuery } from '../../config/useMediaQuery';
import Socials from '../socials/Socials';
import socialData from '../socials/socialData';

// Reusable path matching function
import { isPathActive, startupPaths } from '../../config/pathUtils';

import './Header.scss';

const Header = () => {
	const tabletQuery = useTabletQuery();
	const [menuOpen, setMenuOpen] = React.useState(false);

	const pathname = usePathname();
	const isActive = isPathActive(startupPaths, pathname);

	const linksData = [
		{
			pageLink: pathToStartup,
			pageName: `My Startups`,
			activeClass: isActive ? 'active' : '',
		},
		{
			pageLink: pathToAbout,
			pageName: 'About Me',
			activeClass: '',
		},
		{
			pageLink: pathToProjects,
			pageName: 'Portfolio',
			activeClass: '',
		},
	];

	const navLinkItems = linksData.map(({ pageLink, pageName, activeClass }, i) => {
		return (
			<li className='nav-item' key={i}>
				<Link className={`nav-link ${activeClass}`} href={pageLink}>
					{pageName}
				</Link>
			</li>
		);
	});

	const LogoNavLink = () => {
		return (
			<div className='logo'>
				<Link className='logo-link' href='/'>
					<span className='tag-color'>&lt;</span>
					<span>Buhowski</span>
					<span className='tag-color'>/&gt;</span>
				</Link>
			</div>
		);
	};

	return (
		<header className={`header ${menuOpen ? ' header-overflow' : ''}`}>
			<div className='wrapper'>
				{tabletQuery ? (
					<>
						<LogoNavLink />

						<div
							className='mobile-menu-btn'
							onClick={() => {
								const pageContainer = document.querySelector('.page-container');

								if (pageContainer) {
									pageContainer.scrollTo({ top: 0, behavior: 'smooth' });

									(pageContainer as HTMLElement).style.overflowY = `${
										menuOpen ? 'auto' : 'hidden'
									}`;
								}

								setMenuOpen((o) => !o);
							}}
						>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>

						<nav className={`pos-abs mobile-menu${menuOpen ? ' open' : ''}`}>
							<div className={`mobile-menu__content`}>
								<ul className='mobile-nav'>{navLinkItems}</ul>
								<Socials
									socialData={socialData}
									items={[
										{ id: 'github' },
										{ id: 'linkedin' },
										{ id: 'telegram' },
										{ id: 'instagram' },
									]}
								/>
							</div>
						</nav>
					</>
				) : (
					<div className='header-nav header-nav--desktop'>
						<LogoNavLink />

						<ul className='header-nav__list'>{navLinkItems}</ul>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
