import { Helmet } from "react-helmet";

export default function About() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/about" />
                <title>About • Skiver</title>
                <meta name="description" content="Learn more about us." />
            </Helmet>

            <header>
                <h1>About</h1>
                <p>This is some text in the header tag of the About page.</p>
            </header>

            <main>
                <section>
                    <h2>About Sub-heading</h2>
                    <p>This is some text in the main tag of the About page.</p>
                </section>
            </main>
        </div>
    )
}