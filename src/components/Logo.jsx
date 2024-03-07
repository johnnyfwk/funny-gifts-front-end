import { Link } from "react-router-dom"

export default function Logo({ setIsNavVisible }) {
    function handleLogo() {
        setIsNavVisible(false);
    }

    return (
        <div id="logo">
            <Link to="/" onClick={handleLogo}>Skiver</Link>
        </div>
    )
}