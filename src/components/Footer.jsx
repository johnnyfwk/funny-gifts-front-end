import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div id="footer-links-wrapper">
                <div className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} Skiver.co.uk. All Rights Reserved.</div>
        </footer>
    )
}