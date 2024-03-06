import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard"; 
import * as utils from '../utils';

export default function Home({ maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const category_slug = searchParams.get("category");
    const page = searchParams.get("page");
    
    const [ items, setItems ] = useState(null);
    const [ allPages, setAllPages ] = useState(null); 
    const [ pagesToDisplay, setPagesToDisplay ] = useState(null);

    useEffect(() => {
        let allItemsInCategory;
        if (category_slug === null) {
            allItemsInCategory = allItems;
        } else {
            allItemsInCategory = allItems.filter((post) => utils.convertToSlug(post.category) === category_slug);
        }
        
        if (page === null) {
            setItems(allItemsInCategory.slice(0, maxNumberOfCardsToDisplay));
        } else {
            setItems(allItemsInCategory.slice((parseInt(page) * maxNumberOfCardsToDisplay) - maxNumberOfCardsToDisplay, parseInt(page) * maxNumberOfCardsToDisplay))
        }

        const numberOfPages = Math.ceil(allItemsInCategory.length / maxNumberOfCardsToDisplay);
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
    }, [category_slug, page, maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay])

    function handlePagination() {
        window.scrollTo(0, 0);
    }

    if (!items) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/" />
                <title>Fun Gifts You'll Want To Buy • Skiver</title>
                <meta name="description" content="Finding awesome gifts you can buy online." />
            </Helmet>

            <header>
                <h1>Fun Gifts You'll Want</h1>
                <p>This is some text in the header tag of the Home page.</p>
            </header>

            <main>
                <section>
                    {items.length === 0
                        ? <div>There are no items to display.</div>
                        : <div className="post-cards-wrapper">
                            {items.map((item, index) => {
                                return <ItemCard key={index} item={item} />
                            })}
                        </div>
                    }

                    {!category_slug
                        ? <div className="pagination" onClick={handlePagination}>
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
                        : <div className="pagination" onClick={handlePagination}>
                            {pagesToDisplay.length > 1 && parseInt(page) > 1
                                ? <Link to={`/?category=${category_slug}&page=1`}>&lt;&lt;</Link>
                                : null
                            }
                            {pagesToDisplay.length > 1 && parseInt(page) > 1
                                ? <Link to={`/?category=${category_slug}&page=${parseInt(page) - 1}`}>&lt;</Link>
                                : null
                            }
                            {pagesToDisplay.map((pageNumber, index) => {
                                return (
                                    (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                        ? <div key={index}>{pageNumber}</div>
                                        : <Link key={index} to={`/?category=${category_slug}&page=${pageNumber}`}>{pageNumber}</Link>
                                )
                            })}
                            {pagesToDisplay.length > 1 && page === null
                                ? <Link to={`/?category=${category_slug}&page=2`}>&gt;</Link>
                                : null
                            }
                            {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                                ? <Link to={`/?category=${category_slug}&page=${parseInt(page) + 1}`}>&gt;</Link>
                                : null
                            }
                            {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                                ? <Link to={`/?category=${category_slug}&page=${allPages.length}`}>&gt;&gt;</Link>
                                : null
                            }
                        </div>
                    }
                </section>
            </main>
        </div>
    )
}