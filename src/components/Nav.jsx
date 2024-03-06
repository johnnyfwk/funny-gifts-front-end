import { Link } from "react-router-dom";
import { allItems } from "../assets/content/items";
import * as utils from '../utils';

const categories = Array.from(new Set(allItems.map((item) => item.category))).sort();

export default function Nav() {
    return (
        <nav>
            {categories.map((category, index) => {
                return <Link to={`/?category=${utils.convertToSlug(category)}&page=1`} key={index}>{category}</Link>
            })}
        </nav>
    )
}