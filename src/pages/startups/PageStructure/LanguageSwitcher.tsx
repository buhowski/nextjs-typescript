'use client';

import React from 'react';
import { LanguageSwitcherProps } from '../../../types/common';

const LanguageSwitcherComponent: React.FC<LanguageSwitcherProps> = ({
	currentLang,
	availableLangs,
	changeLanguage,
}) => {
	const allLanguages = ['en', 'ua', 'ru'] as const;

	return (
		<div className='idea-tabs idea-tabs--lang'>
			{allLanguages.map((lang) => (
				<button
					key={lang}
					onClick={() => changeLanguage(lang)}
					className={`idea-tabs__btn lang-btn ${currentLang === lang ? 'active' : ''}`}
					disabled={!availableLangs.includes(lang)}
				>
					{lang.toUpperCase()}
				</button>
			))}
		</div>
	);
};

const LanguageSwitcher = React.memo(LanguageSwitcherComponent);
LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
