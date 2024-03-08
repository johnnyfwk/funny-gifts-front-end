import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
    function handleItemCard() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="item-card">
            <Link
                to={`/items/${item.slug}`}
                onClick={handleItemCard}
            >
                <div className="item-card-image-wrapper">
                    <img
                        src={`/images/${item.images[0].src}`}
                        alt={item.images[0].alt}
                        loading="lazy"
                    />
                </div>
            </Link>
            <div>
                <Link
                    to={`/items/${item.slug}`}
                    className="item-card-name"
                    onClick={handleItemCard}
                >{item.name}</Link>
            </div>
        </div>
    )
}