import { Link } from "react-router-dom";

export default function PostItemCard({ item }) {
    return (
        <div className="post-item-card">
            <h2 className="post-item-card-name">
                <Link to={`/items/${item.slug}`}>{item.name}</Link>
            </h2>
            <p>{item.description}</p>
            <div>
                <Link to={`/items/${item.slug}`}>
                    <img src={`/images/${item.images[0].src}`} alt={item.images[0].alt} loading="lazy" />
                </Link>
            </div>
        </div>
    )
}