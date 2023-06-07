import { useEffect, useState } from "react";
import "../styles/Game.css";

const Game = () => {
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const [clickTrigger, setClickTrigger] = useState(false);
    const [filenameArray, setFilenameArray] = useState<string[]>([]);
    const [currentScore, setcurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isLost, setIsLost] = useState(false);
    const [isWon, setIsWon] = useState(false);

    const images = import.meta.glob("../assets/*png");

    const gameFlow = (filename: string) => {
        const cleanedfileName = filename.split("/").pop();
        if (cleanedfileName === undefined) {
            return;
        }
        if (filenameArray.includes(cleanedfileName)) {
            if (currentScore > bestScore) {
                setBestScore(currentScore);
                localStorage.setItem("bestScore", currentScore.toString());
            }
            setIsLost(true);
            setcurrentScore(0);
            setFilenameArray([]);
            setTimeout(() => {
                setIsLost(false);
            }, 400);
            return;
        }
        setcurrentScore(currentScore + 1);
        if (currentScore + 1 === 12) {
            setIsWon(true);
            setcurrentScore(12);
            setBestScore(12);
            localStorage.setItem("bestScore", (currentScore + 1).toString()); //this is hacky but I dont know how to fix it otherwise
            setTimeout(() => {
                setIsWon(false);
                setcurrentScore(0);
                setFilenameArray([]);
            }, 400);
            return;
        }

        setFilenameArray((prevArray) => [...prevArray, cleanedfileName]);
        setClickTrigger((prevTrigger) => !prevTrigger);
    };

    //load the images to the page
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
    }, [clickTrigger]);

    // load the highest score from local storage
    useEffect(() => {
        setBestScore(parseInt(localStorage.getItem("bestScore") || "0"));
    }, []);

    // useEffect(() => { //for testing
    //     console.table(filenameArray);
    // }, [filenameArray]);

    return (
        <>
            <div className="Information">
                <p>Score: {currentScore}</p>
                <p>High score: {bestScore}</p>
            </div>
            {/*
             We check if the game state is lost / won and append a class name to the div depending on the result
            */}
            <div className={`Game ${isLost ? "lost" : ""} ${isWon ? "won" : ""}`}>
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
