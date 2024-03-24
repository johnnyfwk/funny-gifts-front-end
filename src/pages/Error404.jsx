import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href="https://funnygifts.uk/" />
                <title>404 • FunnyGifts.uk</title>
                <meta name="description" content="You lost? This page doesn't exist. Go away." />
            </Helmet>

            <div className="header-wrapper">
                <header>
                    <h1>404</h1>
                </header>
            </div>
            
            <div className="main-wrapper">
                <main>
                    <section>
                        <div className="body">
                        <p>This page does not exist. Check out the pages below:</p>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/gift-guides/">Gift Guides</Link></li>
                        </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}