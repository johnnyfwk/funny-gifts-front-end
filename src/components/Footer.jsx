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
                        <div className="footer-links-heading">Categories</div>
                        {categories.map((category, index) => {
                            return (
                                <div key={index}>
                                    <Link
                                        to={`/?category=${utils.convertToSlug(category)}&page=1`}
                                        onClick={handleFooterLinks}
                                    >{category}</Link>
                                </div>   
                            )
                        })}
                    </div>

                    <div className="footer-links">
                        <div className="footer-links-heading">FunnyGifts.uk</div>
                        <div>
                            <Link to="/" onClick={handleFooterLinks}>Home</Link>
                        </div>
                        <div>
                            <Link to="/random-gift-generator/" onClick={handleFooterLinks}>Random Gift Generator</Link>
                        </div>
                        <div>
                            <Link to="/gift-guides/" onClick={handleFooterLinks}>Gift Guides</Link>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-links-heading">Legal Stuff</div>
                        <div>
                            <Link to="/terms-and-conditions" onClick={handleFooterLinks}>Terms & Conditions</Link>
                        </div>
                        <div>
                            <Link to="/privacy-policy" onClick={handleFooterLinks}>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
                <div id="copyright">Copyright &copy; {new Date().getFullYear()} FunnyGifts.uk. All Rights Reserved.</div>
            </footer>
        </div>
    )
}