import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    function handlePostCard() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="post-card">
            <Link to={`/gift-guides/${post.slug}`} onClick={handlePostCard}>
                <div className="post-card-image-wrapper">
                    <img src={`/images/${post.image.src}`} alt={post.image.alt} loading="lazy" />
                </div>
            </Link>
            <div className="post-card-name">
                <Link to={`/gift-guides/${post.slug}`} onClick={handlePostCard}>{post.shortName}</Link>
            </div>
        </div>
    )
}