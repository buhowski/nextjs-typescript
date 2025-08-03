// Import the About component from its new location.
import About from '@/pages/about/About';
// Import metadata directly.
import { aboutMetaTags } from '@/components/metaTags';

// Set page-specific metadata.
export const metadata = {
	title: aboutMetaTags.title,
	description: aboutMetaTags.description,
};

export default function AboutPage() {
	return <About />;
}
