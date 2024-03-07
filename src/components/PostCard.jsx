import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <div className="post-card">
            <Link to={`/gift-guides/${post.slug}`}>
                <img src={`/images/${post.image.src}`} alt={post.image.alt} loading="lazy" />
            </Link>
            <div className="post-card-name">
                <Link to={`/gift-guides/${post.slug}`}>{post.name}</Link>
            </div>
        </div>
    )
}