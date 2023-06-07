import "./styles/App.css";
import "./styles/Reset.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Information from "./components/Information";
import Game from "./components/Game";
function App() {
    return (
        <>
            <Header />
            <Information />
            <Game />
            <Footer />
        </>
    );
}

export default App;
