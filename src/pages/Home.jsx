import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard"; 
import * as utils from '../utils';

export default function Home({ maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay }) {
    const [ searchParams ] = useSearchParams();
    const page = searchParams.get("page");
    const category_slug = searchParams.get("category");
    const tag_slug = searchParams.get("tag");
    
    const [ items, setItems ] = useState(null);
    const [ allPages, setAllPages ] = useState(null); 
    const [ pagesToDisplay, setPagesToDisplay ] = useState(null);

    const [ titleAndH1, setTitleAndH1 ] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        let allRelevantItems;
        if (category_slug === null && tag_slug === null) {
            allRelevantItems = allItems;
            setTitleAndH1("Funny gifts that'll make you pee your pants");
            setDescription("Searching the Internet to find funny gifts that'll put a smile on people who have no sense of humour.");
        } else if (category_slug) {
            allRelevantItems = allItems.filter((post) => utils.convertToSlug(post.category) === category_slug);
            setTitleAndH1(utils.slugToCategoryName(category_slug));
            setDescription("");
        } else if (tag_slug) {
            allRelevantItems = allItems.filter((post) => post.tags.some((tag) => {
                return utils.convertToSlug(tag) === tag_slug;
            }));
            setTitleAndH1(`Tag: '${tag_slug.replaceAll("-", " ").replaceAll(" and ", " & ")}'`);
            setDescription("");
        }

        const numberOfPages = Math.ceil(allRelevantItems.length / maxNumberOfCardsToDisplay);
        const listOfAllPages = [];
        for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
            listOfAllPages.push(pageNumber);
        }
        setAllPages(listOfAllPages);
        
        if (page === null) {
            setItems(allRelevantItems.slice(0, maxNumberOfCardsToDisplay));
        } else {
            setItems(allRelevantItems.slice((parseInt(page) * maxNumberOfCardsToDisplay) - maxNumberOfCardsToDisplay, parseInt(page) * maxNumberOfCardsToDisplay))
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
    }, [category_slug, tag_slug, page, maxNumberOfCardsToDisplay, maxNumberOfPagesToDisplay])

    function handlePagination() {
        window.scrollTo(0, 0);
    }

    if (!items) {
        return null;
    }

    return (
        <div>
            {!category_slug && !tag_slug
                ? <Helmet>
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://funnygifts.uk/" />
                    <title>{titleAndH1} • FunnyGifts.uk</title>
                    <meta name="description" content={description} />
                </Helmet>
                : null
            }

            {category_slug || tag_slug
                ? <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <link rel="canonical" href="https://funnygifts.uk/" />
                    <title>{titleAndH1} • FunnyGifts.uk</title>
                    <meta name="description" content={description} />
                </Helmet>
                : null
            }

            <div className="header-wrapper">
                <header>
                    <h1>{titleAndH1}</h1>
                    {/* <p>{description}</p> */}
                </header>
            </div>
            
            <div className="main-wrapper">
                <main>
                    <section>
                        {items.length === 0
                            ? <div>There are no items to display.</div>
                            : <div className="item-cards-wrapper">
                                {items.map((item, index) => {
                                    return <ItemCard key={index} item={item} />
                                })}
                            </div>
                        }
                    </section>

                    <section>
                        {!category_slug && !tag_slug
                            ? <div className="pagination">
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?page=1`} onClick={handlePagination}>&lt;&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?page=${parseInt(page) - 1}`} onClick={handlePagination}>&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.map((pageNumber, index) => {
                                    return (
                                        (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                            ? <div key={index}><strong>{pageNumber}</strong></div>
                                            : <Link key={index} to={`/?page=${pageNumber}`} onClick={handlePagination}>{pageNumber}</Link>
                                    )
                                })}
                                {pagesToDisplay.length > 1 && page === null
                                    ? <Link to={`/?page=2`} onClick={handlePagination}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                                    ? <Link to={`/?page=${parseInt(page) + 1}`} onClick={handlePagination}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                                    ? <Link to={`/?page=${allPages.length}`} onClick={handlePagination}>&gt;&gt;</Link>
                                    : null
                                }
                            </div>
                            : null
                        }

                        {category_slug
                            ? <div className="pagination">
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?category=${category_slug}&page=1`} onClick={handlePagination}>&lt;&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?category=${category_slug}&page=${parseInt(page) - 1}`} onClick={handlePagination}>&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.map((pageNumber, index) => {
                                    return (
                                        (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                            ? <div key={index}><strong>{pageNumber}</strong></div>
                                            : <Link key={index} to={`/?category=${category_slug}&page=${pageNumber}`} onClick={handlePagination}>{pageNumber}</Link>
                                    )
                                })}
                                {pagesToDisplay.length > 1 && page === null
                                    ? <Link to={`/?category=${category_slug}&page=2`}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                                    ? <Link to={`/?category=${category_slug}&page=${parseInt(page) + 1}`} onClick={handlePagination}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                                    ? <Link to={`/?category=${category_slug}&page=${allPages.length}`} onClick={handlePagination}>&gt;&gt;</Link>
                                    : null
                                }
                            </div>
                            : null
                        }

                        {tag_slug
                            ? <div className="pagination">
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?tag=${tag_slug}&page=1`} onClick={handlePagination}>&lt;&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) > 1
                                    ? <Link to={`/?tag=${tag_slug}&page=${parseInt(page) - 1}`} onClick={handlePagination}>&lt;</Link>
                                    : null
                                }
                                {pagesToDisplay.map((pageNumber, index) => {
                                    return (
                                        (pageNumber === 1 && page === null) || (pageNumber === parseInt(page))
                                            ? <div key={index}><strong>{pageNumber}</strong></div>
                                            : <Link key={index} to={`/?tag=${tag_slug}&page=${pageNumber}`} onClick={handlePagination}>{pageNumber}</Link>
                                    )
                                })}
                                {pagesToDisplay.length > 1 && page === null
                                    ? <Link to={`/?tag=${tag_slug}&page=2`} onClick={handlePagination}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && page !== null && (parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1])
                                    ? <Link to={`/?tag=${tag_slug}&page=${parseInt(page) + 1}`} onClick={handlePagination}>&gt;</Link>
                                    : null
                                }
                                {pagesToDisplay.length > 1 && parseInt(page) !== pagesToDisplay[pagesToDisplay.length - 1]
                                    ? <Link to={`/?tag=${tag_slug}&page=${allPages.length}`} onClick={handlePagination}>&gt;&gt;</Link>
                                    : null
                                }
                            </div>
                            : null
                        }
                    </section>
                </main>
            </div>
        </div>
    )
}