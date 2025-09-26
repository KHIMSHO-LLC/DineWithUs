import './globals.css'
export const metadata = {
	title: 'DineWithUs',
	description: 'Find your next authentic dining experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	);
}

