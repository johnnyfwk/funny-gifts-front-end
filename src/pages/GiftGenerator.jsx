import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allItems } from "../assets/content/items";
import * as utils from '../utils';

export default function GiftGenerator() {
    const [ randomGift, setRandomGift ] = useState(null);
    const [ randomNumbersGenerated, setRandomNumbersGenerated] = useState([]);

    useEffect(() => {
        const randomNumber = utils.generateRandomNumber(allItems.length);
        setRandomNumbersGenerated([randomNumber]);
        setRandomGift(allItems[randomNumber]);
    }, [])

    function handleGenerateRandomGiftButton() {
        let randomNumber = utils.generateRandomNumber(allItems.length);
        if (randomNumbersGenerated.length < allItems.length) {
            while (randomNumbersGenerated.includes(randomNumber)) {
                randomNumber = utils.generateRandomNumber(allItems.length);
            }
            setRandomGift(allItems[randomNumber]);
            setRandomNumbersGenerated([...randomNumbersGenerated, randomNumber]);
        } else {
            setRandomGift(allItems[randomNumber]);
            setRandomNumbersGenerated([randomNumber]);
        }
    }

    function handleMoreInfoLink() {
        window.scrollTo(0, 0);
    }

    if (!randomGift) {
        return null;
    }

    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://funnygifts.uk/random-gift-generator" />
                <title>Random Funny Gift Generator • FunnyGifts.uk</title>
                <meta name="description" content="Find funny gifts for friends, family, and colleagues with our random gift generator." />
            </Helmet>

            <div className="header-wrapper">
                <header>
                    <h1>Random Funny Gift Generator</h1>
                </header>
            </div>
            
            <div className="main-wrapper">
                <main>
                    <section id="random-gift-generator-item">
                        <img
                            src={`/images/${randomGift.images[0].src}`}
                            alt={randomGift.images[0].alt}
                            id="random-gift-generator-image"
                        />
                        <div id="random-gift-generator-name">{randomGift.name}</div>
                        <p className="body">{randomGift.description}</p>
                        <div>
                            <Link
                                to={`/items/${randomGift.slug}`}
                                id="random-gift-generator-more-info"
                                onClick={handleMoreInfoLink}
                            >More Info</Link>
                        </div>
                        <div>
                            <div className="button-link" onClick={handleGenerateRandomGiftButton}>Generate Random Gift</div>
                        </div>
                    </section>

                    <section className="body">
                        <h2>Find a random funny gift</h2>
                        <p>We’ve all been in that stressful situation of having only a few hours or days to buy the perfect birthday, wedding, or Secret Santa Christmas gift for friends, family, and colleagues that doesn’t make you look cheap or offend the recipient.</p>
                        <p>Many of us give up and say “<i>This’ll do!</i>” to the next thing we see and watch the recipient fake happiness as they unwrap their disappointment you’ve just handed to them.</p>
                        <p>Avoid these stressful situations with our random gift generator. We waste our time searching the internet for funny gift ideas so you don’t have to waste yours.</p>
                        <p>Simply click the ‘Generate Random Gift’ button until you come across a funny gift that you think someone might like. For more information about the item, click on its image or the 'More Info' link.</p>
                    </section>
                </main>
            </div>
        </div>
    )
}