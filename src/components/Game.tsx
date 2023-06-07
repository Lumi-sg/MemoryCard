import { useEffect, useState } from "react";
import "../styles/Game.css";

const Game = () => {
	const images = import.meta.glob("../assets/*png");
	const [loadedImages, setLoadedImages] = useState<string[]>([]);

	useEffect(() => {
		const loadImages = async () => {
			const imagePaths = Object.keys(images);

			const loadedImagePromises = imagePaths.map(async (path) => {
				const imageModule: any = await images[path]();
				return imageModule.default;
			});

			const loadedImages = await Promise.all(loadedImagePromises);
			setLoadedImages(loadedImages.sort(() => Math.random() - 0.5));
		};

		loadImages();
	}, []);

	return (
		<div className="Game">
			<div className="cardContainer">
				{loadedImages.map((image, index) => (
					<img className="card" key={index} src={image} alt={`Image ${index}`} />
				))}
			</div>
		</div>
	);
};

export default Game;
