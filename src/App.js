import { Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Logo />
            <Nav />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
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
  