import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allPosts } from "../assets/content/posts";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard";

export default function Post() {
    const { post_slug } = useParams();

    const [ post, setPost ] = useState(null);
    const [ items, setitems ] = useState(null);

    useEffect(() => {
        const currentPost = allPosts.filter((post) => post.slug === post_slug);
        setPost(currentPost);
        setitems(allItems.filter((item) => (item.category === currentPost[0].category) && (currentPost[0].tags.every(tag => item.tags.includes(tag)))));
    }, [post_slug]);

    if (!post || !items) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://skiver.co.uk/post/${post_slug}`}/>
                <title>{post[0].name} • Skiver</title>
                <meta name="description" content={post[0].description} />
            </Helmet>

            <header>
                <h1>{post[0].name}</h1>
                <p>{post[0].description}</p>
            </header>

            <main>
                <section>
                    <div dangerouslySetInnerHTML={{ __html: post[0].body }} className="body" />
                    {items.length === 0
                        ? <div>There are no items to display.</div>
                        : <div className="item-cards-wrapper">
                            {items.map((item, index) => {
                                return <ItemCard key={index} item={item} />
                            })}
                        </div>
                    }
                </section>
            </main>
        </div>
    )
}