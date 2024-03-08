import { Link } from "react-router-dom"

export default function Logo({ setIsNavVisible }) {
    function handleLogo() {
        window.scrollTo(0, 0);
        setIsNavVisible(false);
    }

    return (
        <div id="logo">
            <Link to="/" onClick={handleLogo}>Skiver</Link>
        </div>
    )
}