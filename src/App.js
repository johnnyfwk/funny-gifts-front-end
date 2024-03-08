import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Logo from "./components/Logo";
import NavButton from "./components/NavButton";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Item from "./pages/Item";
import GiftGuides from "./pages/GiftGuides";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Error404 from "./pages/Error404";

function App() {
    const maxNumberOfCardsToDisplay = 60;
    const maxNumberOfPagesToDisplay = 5;
    const [ isNavVisible, setIsNavVisible ] = useState(false);
    
    return (
        <div className="App">
            <div id="logo-and-nav-button-wrapper">
                <div id="logo-and-nav-button">
                    <div id="empty-logo-and-nav-button-element"></div>
                    <Logo
                        setIsNavVisible={setIsNavVisible}
                    />
                    <NavButton
                        isNavVisible={isNavVisible}
                        setIsNavVisible={setIsNavVisible}
                    />
                </div>
            </div>
            
            <Nav
                isNavVisible={isNavVisible}
                setIsNavVisible={setIsNavVisible}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            maxNumberOfCardsToDisplay={maxNumberOfCardsToDisplay}
                            maxNumberOfPagesToDisplay={maxNumberOfPagesToDisplay}
                        />
                    }
                ></Route>

                <Route
                    path="/items/:item_slug"
                    element={
                        <Item
                            maxNumberOfCardsToDisplay={maxNumberOfCardsToDisplay}
                        />
                    }
                ></Route>

                <Route
                    path="/gift-guides"
                    element={
                        <GiftGuides
                            maxNumberOfCardsToDisplay={maxNumberOfCardsToDisplay}
                            maxNumberOfPagesToDisplay={maxNumberOfPagesToDisplay}
                        />
                    }
                ></Route>

                <Route
                    path="/gift-guides/:post_slug"
                    element={
                        <Post />
                    }
                ></Route>

                <Route
                    path="/about"
                    element={<About />}
                ></Route>

                <Route
                    path="/contact"
                    element={<Contact />}
                ></Route>

                <Route
                    path="/terms-and-conditions"
                    element={<TermsAndConditions />}
                ></Route>

                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                ></Route>

                <Route
                    path="*"
                    element={<Error404 />}
                ></Route>
            </Routes>

            <Footer />
        </div>
    );
}
  
export default App;
  