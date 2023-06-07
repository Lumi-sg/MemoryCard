import { useEffect, useState } from "react";
import "../styles/Game.css";

const Game = () => {
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const [clickTrigger, setClickTrigger] = useState(false);
    const [filenameArray, setFilenameArray] = useState<string[]>([]);
    const [currentScore, setcurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const images = import.meta.glob("../assets/*png");

    const gameFlow = (filename: string) => {
        const cleanedfileName = filename.split("/").pop();
        if (cleanedfileName === undefined) {
            return;
        }
        if (filenameArray.includes(cleanedfileName)) {
            handleBestScore();
            alert("Already clicked");
            setcurrentScore(0);
            setFilenameArray([]);
            return;
        }

        setcurrentScore(currentScore + 1);
        setFilenameArray((prevArray) => [...prevArray, cleanedfileName]);
        setClickTrigger((prevTrigger) => !prevTrigger);
    };

    const handleBestScore = () => {
        if (currentScore > bestScore) {
            setBestScore(currentScore);
            localStorage.setItem("bestScore", currentScore.toString());
        }
    };

    useEffect(() => {
        //load the images to the page
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
    }, [clickTrigger]);

    useEffect(() => {
        // load the highest score from local storage
        setBestScore(parseInt(localStorage.getItem("bestScore") || "0"));
    });

    return (
        <>
            <div className="Information">
                <p>Current score: {currentScore}</p>
                <p>Best score: {bestScore}</p>
            </div>
            <div className="Game">
                <div className="cardContainer">
                    {loadedImages.map((image, index) => (
                        <img
                            className="card"
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            onClick={() => gameFlow(image)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Game;
