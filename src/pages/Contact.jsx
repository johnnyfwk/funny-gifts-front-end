import { Helmet } from "react-helmet";

export default function Contact() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/contact" />
                <title>Contact • Skiver</title>
                <meta name="description" content="Get in touch with us." />
            </Helmet>

            <header>
                <h1>Contact</h1>
                <p>This is some text in the header tag of the Contact page.</p>
            </header>

            <main>
                <section>
                    <h2>Contact Sub-heading</h2>
                    <p>This is some text in the main tag of the Contact page.</p>
                </section>
            </main>
        </div>
    )
}