import { Link } from "react-router-dom";
import { allItems } from "../assets/content/items";
import * as utils from '../utils';

const categories = Array.from(new Set(allItems.map((item) => item.category))).sort();

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <footer>
                <div id="footer-links-wrapper">
                    <div className="footer-links">
                        <div>Skiver</div>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/gift-guides/">Gift Guides</Link>
                    </div>
                    <div className="footer-links">
                        <div>Categories</div>
                        {categories.map((category, index) => {
                            return <Link to={`/?category=${utils.convertToSlug(category)}&page=1`} key={index}>{category}</Link>
                        })}
                    </div>
                </div>
                <div id="copyright">Copyright &copy; {new Date().getFullYear()} Skiver.co.uk. All Rights Reserved.</div>
            </footer>
        </div>
    )
}