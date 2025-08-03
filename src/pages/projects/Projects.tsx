'use client';

import Masonry from 'react-responsive-masonry';
import { ResponsiveMasonry } from 'react-responsive-masonry';
import projectsData from './projectsData';

import './Projects.scss';

const Projects = () => {
	return (
		<div className='wrapper'>
			<h1 className='base-title h1'>Some Works</h1>
			<div className='projects-container'>
				<ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 666: 2, 1024: 3, 1281: 5 }}>
					<Masonry itemStyle={{ gap: '40px' }} className='projects-container__masonry'>
						{projectsData.map(({ img, url, urlCode, name, description, skills, alt }, i) => {
							return (
								<div className='project' key={i}>
									<a className='project-link' href={url} target='_blank' rel='noopener noreferrer'>
										<img className='project-link__img' src={img.src} alt={alt} />
									</a>

									{skills || description ? (
										<div className='project-description'>
											<p className='project-description__name'>
												{name}
												<span>_</span>
											</p>

											<p className='project-description__text'>{description}</p>

											<div className='project-description__actions'>
												{url && (
													<a
														href={url}
														target='_blank'
														rel='noopener noreferrer'
														className='nav-link'
													>
														Site
													</a>
												)}

												{urlCode && (
													<a
														href={urlCode}
														target='_blank'
														rel='noopener noreferrer'
														className='nav-link'
													>
														Code
													</a>
												)}
											</div>

											{skills && <p className='project-description__title'>Skills:</p>}

											<div className='project-description__items'>
												{skills?.map((skill, i) => {
													return <span key={i}>{skill}</span>;
												})}
											</div>
										</div>
									) : null}
								</div>
							);
						})}
					</Masonry>
				</ResponsiveMasonry>
			</div>
		</div>
	);
};

export default Projects;
