'use client';

import React, { useState, useEffect, useRef, useCallback, memo, Children, useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import { useTabletLargeQuery } from '../../../config/useMediaQuery';
import Slider from '../../../components/Slider';

import { MarkdownBlockProps } from '../../../types/common';

// Helper for checking if content is HTML
const isHtmlDocument = (str: string) => /^\s*<!DOCTYPE html>|<html|<body/i.test(str);

const MarkdownBlockComponent = ({
	src,
	sliderContent,
	currentLanguage,
	onError,
	onHeadingsExtracted,
	pitchIndex,
}: MarkdownBlockProps) => {
	// state for markdown content
	const [text, setText] = useState('');
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// refs for component instance tracking
	const hasInitialTextLoadedRef = useRef(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// query for large tablets
	const useTabletLarge = useTabletLargeQuery();

	// ref for slug counters
	const slugCountersRef = useRef<{ [key: string]: number }>({});

	// function to generate unique slugs
	const slugify = useCallback((input: string) => {
		const baseSlug =
			input
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/[\s_-]+/g, '-')
				.replace(/^-+|-+$/g, '') || 'section';

		const count = slugCountersRef.current[baseSlug] ?? 0;
		slugCountersRef.current[baseSlug] = count + 1;
		return count > 0 ? `${baseSlug}-${count}` : baseSlug;
	}, []);

	// fetch markdown content
	useEffect(() => {
		setHasError(false);
		onError?.(false);
		slugCountersRef.current = {};

		if (!hasInitialTextLoadedRef.current) setIsLoading(true);

		const fetchData = async () => {
			try {
				const res = await fetch(src);
				if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
				const fetchedText = await res.text();
				if (isHtmlDocument(fetchedText)) {
					throw new Error(`Content is HTML, not Markdown. Path: ${src}`);
				}
				setText(fetchedText);
			} catch (err) {
				console.error('Markdown fetch error:', err);
				setHasError(true);
				onError?.(true);
			} finally {
				setIsLoading(false);
				hasInitialTextLoadedRef.current = true;
			}
		};

		fetchData();
	}, [src, onError, pitchIndex]);

	// extract headings from DOM
	useEffect(() => {
		if (!onHeadingsExtracted || !containerRef.current) return;

		const headings = Array.from(containerRef.current.querySelectorAll('h1, h2, h3'))
			.map((el) => {
				const id = el.getAttribute('id');
				if (!id) return null;
				return {
					text: el.textContent || '',
					level: parseInt(el.tagName.charAt(1)),
					id,
				};
			})
			.filter((h) => h !== null);

		onHeadingsExtracted(headings);
	}, [text, onHeadingsExtracted, pitchIndex]);

	// generic heading renderer
	const renderHeading = useCallback(
		(children: React.ReactNode, level: number) => {
			const rawText = Children.toArray(children).join('');
			const slug = slugify(rawText);
			const id = `h${level}-${pitchIndex}-${slug}`;
			const Tag = `h${level}` as keyof JSX.IntrinsicElements;
			return <Tag id={id}>{children}</Tag>;
		},
		[slugify, pitchIndex]
	);

	// custom markdown components
	const components: Components = useMemo(
		() => ({
			h1: ({ children }) => renderHeading(children, 1),
			h2: ({ children }) => renderHeading(children, 2),
			h3: ({ children }) => renderHeading(children, 3),
			p: ({ children }) => {
				const childArray = Children.toArray(children);
				const isMobileSliderTag =
					childArray.length === 1 &&
					typeof childArray[0] === 'string' &&
					childArray[0].trim() === '[mobile-slider]';
				if (isMobileSliderTag) {
					return useTabletLarge ? (
						<Slider slides={sliderContent || []} currentLanguage={currentLanguage} />
					) : null;
				}
				const hasEm = childArray.some(
					(child) => React.isValidElement(child) && child.type === 'em'
				);
				return <p className={hasEm ? 'description__has-em' : undefined}>{children}</p>;
			},
			a: ({ href, children }) => (
				<a href={href} target='_blank' rel='noopener noreferrer'>
					<span>{children}</span>
				</a>
			),
		}),
		[renderHeading, useTabletLarge, sliderContent, currentLanguage]
	);

	// handle loading and errors
	if (isLoading && !hasInitialTextLoadedRef.current) {
		return <h1>Loading content...</h1>;
	}
	if (hasError || !text.trim()) {
		return null;
	}

	// main render
	return (
		<div ref={containerRef}>
			<ReactMarkdown components={components}>{text}</ReactMarkdown>
		</div>
	);
};

const MarkdownBlock = memo(MarkdownBlockComponent);
MarkdownBlock.displayName = 'MarkdownBlock';

export default MarkdownBlock;
