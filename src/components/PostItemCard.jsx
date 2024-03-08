import { Link } from "react-router-dom";

export default function PostItemCard({ item }) {
    function handlePostItemCard() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="post-item-card">
            <div>
                <Link to={`/items/${item.slug}`} onClick={handlePostItemCard}>
                    <img
                        src={`/images/${item.images[0].src}`}
                        alt={item.images[0].alt}
                        loading="lazy"
                    />
                </Link>
            </div>
            <div className="post-item-card-name-and-description">
                <h2 className="post-item-card-name">
                    <Link to={`/items/${item.slug}`} onClick={handlePostItemCard}>{item.name}</Link>
                </h2>
                <p className="post-item-card-description">{item.description}</p>
            </div>
        </div>
    )
}