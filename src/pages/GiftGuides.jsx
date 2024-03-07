import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { allPosts } from "../assets/content/posts";
import PostCard from "../components/PostCard";

export default function GiftGuides({ maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay }) {
    const [ searchParams ] = useSearchParams();
    const page = searchParams.get("page");

    const [ posts, setPosts ] = useState(null);
    const [ allPages, setAllPages ] = useState(null);
    const [ pagesToDisplay, setPagesToDisplay ] = useState(null);

    useEffect(() => {
        const numberOfPages = Math.ceil(allPosts.length / maxNumberOfCardsToDisplay);
        const listOfAllPages = [];
        for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
            listOfAllPages.push(pageNumber);
        }
        setAllPages(listOfAllPages);

        if (page === null || numberOfPages === 1) {
            setPosts(allPosts.slice(0, maxNumberOfCardsToDisplay));
        } else {
            setPosts(allPosts.slice((parseInt(page) * maxNumberOfCardsToDisplay) - maxNumberOfCardsToDisplay, parseInt(page) * maxNumberOfCardsToDisplay));
        }

        let listOfPagesToDisplay;
        if ((page === null) || (numberOfPages > 1 && parseInt(page) <= Math.ceil(maxNumberOfPagesToDisplay/2))) {
            listOfPagesToDisplay = listOfAllPages.slice(0, maxNumberOfPagesToDisplay);
        } else if (numberOfPages > 1 && parseInt(page) > numberOfPages - (Math.ceil(maxNumberOfPagesToDisplay/2))) {
            listOfPagesToDisplay = listOfAllPages.slice(-maxNumberOfPagesToDisplay);
        } else {
            listOfPagesToDisplay = listOfAllPages.slice(parseInt(page) - Math.ceil(maxNumberOfPagesToDisplay/2), parseInt(page) + Math.floor(maxNumberOfPagesToDisplay/2));
        }
        setPagesToDisplay(listOfPagesToDisplay);
    }, [page, maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay])

    function handlePagination() {
        window.scrollTo(0, 0);
    }

    if (!posts) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/gift-guides" />
                <title>Gift Guides • Skiver</title>
                <meta name="description" content="Find the perfect gift for anyone by checking out our gift guides." />
            </Helmet>

            <header>
                <h1>Gift Guides</h1>
                <p>Find the perfect gift for anyone by checking out our gift guides.</p>
            </header>


            <main>
                <section>
                    <div className="post-cards-wrapper">
                        {posts.map((post, index) => {
                            return (
                                <PostCard key={index} post={post} />
                            )
                        })}
                    </div>
                </section>

                <section>
                    <div className="pagination" onClick={handlePagination}>
                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/gift-guides?page=1`}>&lt;&lt;</Link>
                            : null
                        }
                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/gift-guides?page=${parseInt(page) - 1}`}>&lt;</Link>
                            : null
                        }
                        {pagesToDisplay.map((pageNumber, index) => {
                            return (
                                (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                    ? <div key={index}>{pageNumber}</div>
                                    : <Link key={index} to={`/gift-guides?page=${pageNumber}`}>{pageNumber}</Link>
                            )
                        })}
                        {pagesToDisplay.length > 1 && page === null
                            ? <Link to={`/gift-guides?page=2`}>&gt;</Link>
                            : null
                        }
                        {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                            ? <Link to={`/gift-guides?page=${parseInt(page) + 1}`}>&gt;</Link>
                            : null
                        }
                        {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                            ? <Link to={`/gift-guides?page=${allPages.length}`}>&gt;&gt;</Link>
                            : null
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}