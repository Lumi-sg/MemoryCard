import "./styles/App.css";
import "./styles/Reset.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Game from "./components/Game";
function App() {
    return (
        <>
            <Header />
            <Game />
            <Footer />
        </>
    );
}

export default App;
