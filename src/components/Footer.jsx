import { Link } from "react-router-dom";
import { allItems } from "../assets/content/items";
import * as utils from '../utils';

const categories = Array.from(new Set(allItems.map((item) => item.category))).sort();

export default function Footer() {
    function handleFooterLinks() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="footer-wrapper">
            <footer>
                <div id="footer-links-wrapper">
                    <div className="footer-links">
                        <div>Skiver</div>
                        <Link to="/" onClick={handleFooterLinks}>Home</Link>
                        <Link to="/gift-guides/" onClick={handleFooterLinks}>Gift Guides</Link>
                    </div>

                    <div className="footer-links">
                        <div>Categories</div>
                        {categories.map((category, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/?category=${utils.convertToSlug(category)}&page=1`}
                                    onClick={handleFooterLinks}
                                >{category}</Link>
                            )
                        })}
                    </div>

                    <div className="footer-links">
                        <div>Legal Stuff</div>
                        <Link to="/terms-and-conditions" onClick={handleFooterLinks}>Terms & Conditions</Link>
                        <Link to="/privacy-policy" onClick={handleFooterLinks}>Privacy Policy</Link>
                    </div>
                </div>
                <div id="copyright">Copyright &copy; {new Date().getFullYear()} Skiver.co.uk. All Rights Reserved.</div>
            </footer>
        </div>
    )
}