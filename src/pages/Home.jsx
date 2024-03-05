import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allPosts } from "../assets/content/posts";
import PostCard from "../components/PostCard";

export default function Home({ maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    
    const [ posts, setPosts ] = useState(null);
    const [ allPages, setAllPages ] = useState(null); 
    const [ pagesToDisplay, setPagesToDisplay ] = useState(null);

    useEffect(() => {
        if (page === null) {
            setPosts(allPosts.slice(0, maxNumberOfCardsToDisplay));
        } else {
            setPosts(allPosts.slice((parseInt(page) * maxNumberOfCardsToDisplay) - maxNumberOfCardsToDisplay, parseInt(page) * maxNumberOfCardsToDisplay))
        }

        const numberOfPages = Math.ceil(allPosts.length / maxNumberOfCardsToDisplay);
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
                <link rel="canonical" href="https://skiver.co.uk/" />
                <title>Awesome Stuff That Exists • Skiver</title>
                <meta name="description" content="Finding awesome stuff you'll want." />
            </Helmet>

            <header>
                <h1>Awesome Stuff That Exists</h1>
                <p>This is some text in the header tag of the Home page.</p>
            </header>

            <main>
                <section>
                    {posts.length === 0
                        ? <div>There are no posts to display.</div>
                        : <div className="post-cards-wrapper">
                            {posts.map((post, index) => {
                                return <PostCard key={index} post={post} />
                            })}
                        </div>
                    }
                    
                    <div className="pagination" onClick={handlePagination}>
                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/?page=1`}>&lt;&lt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && parseInt(page) > 1
                            ? <Link to={`/?page=${parseInt(page) - 1}`}>&lt;</Link>
                            : null
                        }

                        {pagesToDisplay.map((pageNumber, index) => {
                            return (
                                (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                    ? <div key={index}>{pageNumber}</div>
                                    : <Link key={index} to={`/?page=${pageNumber}`}>{pageNumber}</Link>
                            )
                        })}

                        {pagesToDisplay.length > 1 && page === null
                            ? <Link to={`/?page=2`}>&gt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                            ? <Link to={`/?page=${parseInt(page) + 1}`}>&gt;</Link>
                            : null
                        }

                        {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                            ? <Link to={`/?page=${allPages.length}`}>&gt;&gt;</Link>
                            : null
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}