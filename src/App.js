import { Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Item from "./pages/Item";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
    const maxNumberOfCardsToDisplay = 3;
    const maxNumberOfPagesToDisplay = 5;
    
    return (
        <div className="App">
            <Logo />
            <Nav />
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
                    path="/post/:post_slug"
                    element={
                        <Post
                            maxNumberOfCardsToDisplay={maxNumberOfCardsToDisplay}
                            maxNumberOfPagesToDisplay={maxNumberOfPagesToDisplay}
                        />}
                ></Route>
                <Route
                    path="/item/:item_slug"
                    element={<Item maxNumberOfCardsToDisplay={maxNumberOfCardsToDisplay} />}
                ></Route>
                <Route
                    path="/about"
                    element={<About />}
                ></Route>
                <Route
                    path="/contact"
                    element={<Contact />}
                ></Route>
            </Routes>
            <Footer />
        </div>
    );
}
  
export default App;
  