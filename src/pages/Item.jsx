import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard";
import * as utils from "../utils";

export default function Item({ maxNumberOfCardsToDisplay }) {
    const { item_slug } = useParams();

    const [ item, setItem ] = useState(null);
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ relatedItems, setRelatedItems ] = useState(null);
    
    useEffect(() => {
        const currentItem = allItems.filter((item) => item.slug === item_slug);
        setItem(currentItem);
        setSelectedImage(currentItem[0].images[0]);
        const allRelatedItems = allItems.filter((item) => (item.slug !== currentItem[0].slug && item.tags.some((tag) => currentItem[0].tags.includes(tag)))
            || (item.slug !== currentItem[0].slug && item.category === currentItem[0].category));

        let relatedItemsToDisplay;
        if (allRelatedItems.length > 0) {
            relatedItemsToDisplay = allRelatedItems.slice(0, maxNumberOfCardsToDisplay);
        } else {
            const allAlternativeRelatedItems = allItems.filter((item) => item.slug !== item_slug);
            relatedItemsToDisplay = allAlternativeRelatedItems.slice(0, maxNumberOfCardsToDisplay);
        }
        setRelatedItems(relatedItemsToDisplay);
    }, [item_slug, maxNumberOfCardsToDisplay]);

    function handleItemImageThumbnail(event) {
        const imageArray = event.target.currentSrc.split("/");
        const src = imageArray[imageArray.length - 1];
        const alt = event.target.alt;
        setSelectedImage({ src, alt });
    }

    if (!item) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://funnygifts.uk/items/${item_slug}`} />
                <title>{item[0].name} • FunnyGifts.uk</title>
                <meta name="description" content={item[0].description} />
            </Helmet>

            <div className="main-wrapper">
                <main>
                    <section id="item">
                        <div id="item-images-body-and-external-link-button">
                            {item[0].images.length > 1
                                ? <div id="item-images">
                                    <img src={`/images/${selectedImage.src}`} alt={selectedImage.alt} id="item-main-image" />
                                    <div id="item-image-thumbnails">
                                        {item[0].images.map((image, index) => {
                                            return (
                                                <img key={index} src={`/images/${item[0].images[index].src}`} alt={item[0].images[index].alt} onClick={handleItemImageThumbnail}/>
                                            )
                                        })}
                                    </div>
                                </div>
                                : <img src={`/images/${selectedImage.src}`} alt={selectedImage.alt} id="item-main-image" />
                            }
                            <div id="item-body-and-external-link-button">
                                <h1 id="item-name">{item[0].name}</h1>
                                <div className="item-category">
                                    <strong>Category: </strong>
                                    <Link to={`/?category=${utils.convertToSlug(item[0].category)}&page=1`}>{item[0].category}</Link>
                                </div>
                                <div id="item-tag-label-and-tags">
                                    <strong>Tags:</strong>
                                    <div id="item-tags-wrapper">
                                        {item[0].tags.map((tag, index) => {
                                            return (
                                                <Link key={index} to={`/?tag=${utils.convertToSlug(tag)}&page=1`}>{tag}</Link>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: item[0].body }} className="body" />
                                <div className="item-external-link-button">
                                    <a href={item[0].externalLink} target="_blank" rel="noopener noreferrer" className="item-external-link">Buy from {item[0].supplier}</a>
                                </div>
                            </div>
                            
                        </div>
                    </section>

                    <section id="related-items">
                        <h3>Other Awesome Stuff</h3>
                        {relatedItems.length === 0
                            ? <div>No related items.</div>
                            : <div className="item-cards-wrapper">
                                {relatedItems.map((item, index) => {
                                    return <ItemCard key={index} item={item} />
                                })}
                            </div>
                        }
                    </section>
                </main>
            </div>
        </div>
    )
}