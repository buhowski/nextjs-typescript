// Posters
import promoPoster from '../../../assets/films/EuropeanUkrainians/promo.webp';
import broadCityPoster from '../../../assets/films/EuropeanUkrainians/broadCityPoster.webp';
import fantasyPoster from '../../../assets/films/EuropeanUkrainians/fantasyPoster.webp';
import bestMomentsPoster from '../../../assets/films/EuropeanUkrainians/always-sunny-the-gang.webp';

// Videos
const promoVideo = '/videos/teaserVideo.mp4';
const broadCityTrailer = '/videos/broadCityTrailer.mp4';
const fantasy = '/videos/fantasy.mp4';
const bestMomentsVideo = 'https://www.youtube-nocookie.com/embed/cbSEr1oJ8mw';

export const dataSliderEuropeanUkrainians = [
	{
		itemPoster: bestMomentsPoster,
		itemSrc: bestMomentsVideo,
		itemAlt: `Poster from 'It's Always Sunny in Philadelphia', capturing The Gang's disastrous attempts at normal social interaction.`,
		itemCaption: `The vibe I want to capture: The Gang Interacts with Normal People.`,
	},

	{
		itemPoster: promoPoster,
		itemSrc: promoVideo,
		itemAlt: `Promotional poster for 'It's Always Sunny in Philadelphia'.`,
		itemCaption: `The vibe I want to capture: promo from "It's Always Sunny in Philadelphia."`,
	},

	{
		itemPoster: broadCityPoster,
		itemSrc: broadCityTrailer,
		itemAlt: `Promotional poster for the TV series 'Broad City'.`,
		itemCaption: `The vibe I want to capture: promo from "Broad City."`,
	},

	{
		itemPoster: fantasyPoster,
		itemSrc: fantasy,
		itemAlt: `Movie poster for 'The Secret Life of Walter Mitty'.`,
		itemCaption: `Imagination Example: from "The Secret Life of Walter Mitty."`,
	},
];
