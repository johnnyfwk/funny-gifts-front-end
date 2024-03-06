import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
    function handleItemCard() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="item-card">
            <Link to={`/item/${item.slug}`} onClick={handleItemCard}>
                <img src={`/images/${item.images[0].src}`} alt={item.images[0].alt} loading="lazy" />
            </Link>
            <h2>
                <Link to={`/item/${item.slug}`} className="item-card-name"  onClick={handleItemCard}>{item.name}</Link>
            </h2>
        </div>
    )
}