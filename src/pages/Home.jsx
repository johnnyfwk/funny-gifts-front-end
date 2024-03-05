import { Helmet } from "react-helmet";

export default function Home() {
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
                <h2>Home Sub-heading</h2>
                <p>This is some text in the main tag of the Home page.</p>
            </main>
        </div>
    )
}