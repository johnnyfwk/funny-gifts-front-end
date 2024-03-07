import { Helmet } from "react-helmet";

export default function TermsAndConditions() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/terms-and-conditions" />
                <title>Terms & Conditions • Skiver</title>
                <meta name="description" content="The terms and conditions for Skiver.co.uk." />
            </Helmet>

            <div className="header-wrapper">
                <header>
                    <h1>Terms & Conditions</h1>
                </header>
            </div>
            
            <div className="main-wrapper">
                <main>
                    <section className="body">
                        <p>Welcome to Skiver.co.uk ("the Website"). Please read these Terms and Conditions carefully before using our services.</p>
                        
                        <p>By accessing or using the Website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these Terms and Conditions, you may not use the Website.</p>

                        <h2>Third-Party Purchases</h2>
                        <p>The Website facilitates the display of gift ideas sourced from third-party websites ("Third-Party Sites"). Users can click on links provided to purchase items directly from the Third-Party Sites.</p>
                        <p>The Company does not directly sell products. All transactions occur on the Third-Party Sites, and the User is subject to their respective terms and conditions.</p>

                        <h2>User Responsibilities</h2>
                        <p>Users must adhere to the terms and conditions of the Third-Party Sites when making purchases. The Company is not responsible for any disputes or issues arising from transactions on Third-Party Sites.</p>
                        <p>Users must provide accurate and complete information to the Third-Party Sites during the purchasing process.</p>

                        <h2>Pricing and Availability</h2>
                        <p>The Company does not control the pricing or availability of products on Third-Party Sites. Prices and availability may change without notice.</p>
                        <p>The Company is not responsible for any discrepancies in pricing or availability displayed on the Website and the actual Third-Party Site.</p>

                        <h2>Product Descriptions</h2>
                        <p>The Company strives to provide accurate and up-to-date product information. However, the Company does not guarantee the accuracy or completeness of product descriptions from Third-Party Sites.</p>
                        <p>Users should refer to the product details and descriptions provided on the Third-Party Sites for the most accurate information.</p>

                        <h2>Returns and Refunds</h2>
                        <p>Returns, refunds, and exchanges are subject to the policies of the Third-Party Sites. Users should review the return policy of the specific Third-Party Site from which they make a purchase.</p>

                        <h2>Intellectual Property</h2>
                        <p>All content related to third-party products, including images, descriptions, and trademarks, is the property of the respective Third-Party Sites.</p>
                        <p>Users may not reproduce, distribute, display, or create derivative works from any part of the content without prior written consent from the respective Third-Party Site.</p>

                        <h2>Limitation of Liability</h2>
                        <p>The Company is not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of third-party services or products.</p>

                        <h2>Indemnification</h2>
                        <p>Users agree to indemnify and hold harmless the Company from any claims, damages, or losses arising from the User's use of third-party services.</p>

                        <h2>Governing Law</h2>
                        <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the UK.</p>

                        <p>By using the third-party purchase services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. The Company is not responsible for any transactions conducted on Third-Party Sites, and any disputes should be directed to the respective Third-Party Site's customer service.</p>
                    </section>
                </main>
            </div>
        </div>
    )
}