import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { allItems } from "../assets/content/items";
import * as utils from '../utils';

const categories = Array.from(new Set(allItems.map((item) => item.category))).sort();

export default function Nav({ isNavVisible, setIsNavVisible }) {
    const screenWidthBreakpoint = 500;
    const [ isNavCategoriesVisible, setIsNavCategoriesVisible] = useState(false);

    useEffect(() => {
        setIsNavCategoriesVisible(false);
        if (window.innerWidth < screenWidthBreakpoint) {
            setIsNavCategoriesVisible(true);
        } else {
            setIsNavCategoriesVisible(false);
        }
    }, []);

    function handleNavLink() {
        window.scrollTo(0, 0);
        setIsNavVisible(false);  
        if (window.innerWidth >= screenWidthBreakpoint) {
            setIsNavCategoriesVisible(false);
        }  
    }

    function handleNavCategoriesMouseEnter() {
        if (window.innerWidth >= screenWidthBreakpoint) {
            setIsNavCategoriesVisible(true);
        }
    }

    function handleNavCategoriesMouseLeave() {
        if (window.innerWidth >= screenWidthBreakpoint) {
            setIsNavCategoriesVisible(false);
        }
    }

    const styleNav = {
        left: isNavVisible ? "0%" : "100%",
    };

    const styleNavCategories = {
        display: isNavCategoriesVisible ? "grid" : "none"
    };

    return (
        <div className="nav-wrapper">
            <nav style={styleNav}>
                <div
                    className="nav-categories-heading"
                    onMouseEnter={handleNavCategoriesMouseEnter}
                    onMouseLeave={handleNavCategoriesMouseLeave}
                >
                    Categories
                    <div className="nav-categories" style={styleNavCategories}>
                        {categories.map((category, index) => {
                            return (
                                <Link
                                    to={`/?category=${utils.convertToSlug(category)}&page=1`}
                                    key={index}
                                    onClick={handleNavLink}
                                >{category}</Link>
                            )
                        })}
                    </div>
                </div>
                <Link to="/gift-guides/" onClick={handleNavLink}>Gift Guides</Link>
            </nav>
        </div>
    )
}