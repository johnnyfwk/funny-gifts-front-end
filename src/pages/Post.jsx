import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { allPosts } from "../assets/content/posts";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard";

export default function Post({ maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");

    const { post_slug } = useParams();

    const [ post, setPost ] = useState(null);
    const [ items, setItems ] = useState(null);
    const [ allPages, setAllPages ] = useState(null); 
    const [ pagesToDisplay, setPagesToDisplay ] = useState(null);

    useEffect(() => {
        const currentPost = allPosts.filter((post) => post.slug === post_slug);
        setPost(currentPost);

        const allItemsInPost = allItems.filter((item) => (item.category === currentPost[0].category) && (currentPost[0].tags.every(tag => item.tags.includes(tag))));
        if (page === null) {
            setItems(allItemsInPost.slice(0, maxNumberOfCardsToDisplay));
        } else {
            setItems(allItemsInPost.slice((parseInt(page) * maxNumberOfCardsToDisplay) - maxNumberOfCardsToDisplay, parseInt(page) * maxNumberOfCardsToDisplay))
        }

        const numberOfPages = Math.ceil(allItemsInPost.length / maxNumberOfCardsToDisplay);
        const listOfAllPages = [];
        for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
            listOfAllPages.push(pageNumber);
        }
        setAllPages(listOfAllPages);

        var listOfPagesToDisplay;
        if ((page === null && numberOfPages === 1) ||
            (page === null && numberOfPages > 1) ||
            (numberOfPages > 1 && parseInt(page) <= Math.ceil(maxNumberOfPagesToDisplay/2))
        ) {
            listOfPagesToDisplay = listOfAllPages.slice(0, maxNumberOfPagesToDisplay);
        } else if (numberOfPages > 1 && parseInt(page) > numberOfPages - (Math.ceil(maxNumberOfPagesToDisplay/2))) {
            listOfPagesToDisplay = listOfAllPages.slice(-maxNumberOfPagesToDisplay);
        } else {
            listOfPagesToDisplay = listOfAllPages.slice(parseInt(page) - Math.ceil(maxNumberOfPagesToDisplay/2), parseInt(page) + Math.floor(maxNumberOfPagesToDisplay/2));
        }
        setPagesToDisplay(listOfPagesToDisplay);
    }, [post_slug, page, maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay]);

    function handlePagination() {
        window.scrollTo(0, 0);
    }

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
                            {items.map((item, index) => <ItemCard key={index} item={item} />)}
                        </div>
                    }

                    <div className="pagination" onClick={handlePagination}>
                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/post/${post_slug}?page=1`}>&lt;&lt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/post/${post_slug}?page=${parseInt(page) - 1}`}>&lt;</Link>
                            : null
                        }

                        {pagesToDisplay.map((pageNumber, index) => {
                            return (
                                (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                    ? <div key={index}>{pageNumber}</div>
                                    : <Link key={index} to={`/post/${post_slug}?page=${pageNumber}`}>{pageNumber}</Link>
                            )
                        })}

                        {pagesToDisplay.length > 1 && page === null
                            ? <Link to={`/post/${post_slug}?page=2`}>&gt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                            ? <Link to={`/post/${post_slug}?page=${parseInt(page) + 1}`}>&gt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                            ? <Link to={`/post/${post_slug}?page=${allPages.length}`}>&gt;&gt;</Link>
                            : null
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}