import Image from 'next/image';

const FooterImages = () => {
	return (
		<div className="flex justify-around gap-5 bg-white h-20 w-full p-5">
			<Image
				src="/salade.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
			<Image
				src="/plats.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
			<Image
				src="/rolls.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
			<Image
				src="/dessert.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
			<Image
				src="/coca.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
			<Image
				src="/frite.png"
				alt="A Table logo"
				width={50}
				height={'100%'}
			/>
		</div>
	);
};

export default FooterImages;
