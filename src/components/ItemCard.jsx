import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
    return (
        <div className="item-card">
            <Link to={`/item/${item.slug}`}>
                <img src={`/images/${item.images[0].src}`} alt={item.images[0].alt} />
            </Link>
            <h2>
                <Link to={`/item/${item.slug}`} className="item-card-name">{item.name}</Link>
            </h2>
        </div>
    )
}