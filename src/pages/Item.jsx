import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { allItems } from "../assets/content/items";
import ItemCard from "../components/ItemCard";

export default function Item({ maxNumberOfCardsToDisplay }) {
    const { item_slug } = useParams();

    const [ item, setItem ] = useState(null);
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ relatedItems, setRelatedItems ] = useState(null);
    
    useEffect(() => {
        const currentItem = allItems.filter((item) => item.slug === item_slug);
        setItem(currentItem);
        setSelectedImage(currentItem[0].images[0]);
        setRelatedItems(allItems.filter((item) => item.tags.some((tag) => currentItem[0].tags.includes(tag)) && item.slug !== currentItem[0].slug).slice(0, maxNumberOfCardsToDisplay));
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
                <link rel="canonical" href={`https://skiver.co.uk/item/${item_slug}`} />
                <title>{item[0].name} • Skiver</title>
                <meta name="description" content={item[0].description} />
            </Helmet>

            <header>
                <h1>{item[0].name}</h1>
                <p>{item[0].description}</p>
                <div><strong>Category:</strong> {item[0].category}</div>
                <div id="item-tag-label-and-tags">
                    <strong>Tags:</strong>
                    <div id="item-tags-wrapper">
                        {item[0].tags.map((tag, index) => {
                            return (
                                <div key={index}>{tag}</div>
                            )
                        })}
                    </div>
                </div>
            </header>

            <main>
                <section id="item">
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

                    <div dangerouslySetInnerHTML={{ __html: item[0].body }} className="body" />

                    <div className="item-external-link-button">
                        <a href={item[0].externalLink} target="_blank" rel="noopener noreferrer" className="item-external-link">Visit {item[0].supplier}</a>
                    </div>
                </section>

                <section>
                    <h3>Related Items</h3>
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
    )
}