/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.unsplash.com' },
			{ protocol: 'https', hostname: 'plus.unsplash.com' },
			{ protocol: 'https', hostname: 'lh3.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh4.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh5.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh6.googleusercontent.com' },
			{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }
		]
	}
};

export default nextConfig;

