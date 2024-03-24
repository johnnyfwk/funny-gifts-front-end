import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allPosts } from "../assets/content/posts";
import { allItems } from "../assets/content/items";
import ItemCard from '../components/ItemCard';

export default function Post() {
    const { post_slug } = useParams();

    const [ post, setPost ] = useState(null);
    const [ items, setItems ] = useState(null);

    useEffect(() => {
        const currentPost = allPosts.filter((post) => post.slug === post_slug);
        setPost(currentPost);
        let allItemsInPost;
        if (currentPost[0].category) {
            allItemsInPost = allItems.filter((item) => currentPost[0].category === item.category && currentPost[0].tags.every(tag => item.tags.includes(tag)));
        } else {
            allItemsInPost = allItems.filter((item) => currentPost[0].tags.every(tag => item.tags.includes(tag)));
        }
        setItems(allItemsInPost);
    }, [post_slug]);

    if (!post || !items) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://funnygifts.uk/gift-guides/${post_slug}`}/>
                <title>{post[0].name} • FunnyGifts.uk</title>
                <meta name="description" content={post[0].description} />
            </Helmet>

            <div className="header-wrapper">
                <header>
                    <h1>{post[0].name}</h1>
                </header>
            </div>

            <div className="main-wrapper">
                <main id="post">
                    <section>
                        <div dangerouslySetInnerHTML={{ __html: post[0].body }} className="body" />

                        {items.length === 0
                            ? <div>There are no items to display.</div>
                            : <div className="item-cards-wrapper">
                                {items.map((item, index) => <ItemCard key={index} item={item} />)}
                            </div>
                        }
                    </section>
                </main>
            </div>
        </div>
    )
}