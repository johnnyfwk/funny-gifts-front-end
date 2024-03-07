import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://skiver.co.uk/privacy-policy" />
                <title>Privacy Policy • Skiver</title>
                <meta name="description" content="The privacy policy for Skiver.co.uk." />
            </Helmet>

            <div className="header-wrapper">
                <header>
                    <h1>Privacy Policy</h1>
                </header>
            </div>
            
            <div className="main-wrapper">
                <main>
                    <section className="body">
                        <p>This Privacy Policy describes how Skiver.co.uk ("we", "us", or "our") collects, uses, and discloses personal information when you visit or interact with our website and services.</p>

                        <h2>Information We Collect</h2>
                        <ul>
                            <li><strong>Personal Information:</strong> When you visit our website, we may collect personal information that you voluntarily provide to us, such as your name, email address, and any other information you provide when contacting us.</li>
                            <li><strong>Log Data:</strong> Like many websites, we collect information that your browser sends whenever you visit our website ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</li>
                            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We may use the information we collect for various purposes, including to:</p>
                        <ul>
                            <li>Provide, maintain, and improve our website and services.</li>
                            <li>Communicate with you, including responding to your inquiries and providing you with updates and marketing messages.</li>
                            <li>Analyse trends, administer the website, track users' movements around the website, and gather demographic information.</li>
                            <li>Detect, prevent, and address technical issues and security vulnerabilities.</li>
                        </ul>

                        <h2>Disclosure of Your Information</h2>
                        <p>We may disclose your personal information to third-party service providers who assist us in operating our website and services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                        <h2>Affiliate Marketing</h2>
                        <p>Skiver.co.uk participates in affiliate marketing programs where we earn commissions by referring visitors to our affiliate partners' products and services. When you click on affiliate links on our website, cookies may be placed on your device to track your activity and ensure that we receive proper credit for the referral. This allows us to earn a commission if you make a purchase through the affiliate link.</p>

                        <h2>Your Choices</h2>
                        <p>You can choose to disable cookies through your browser settings or by using opt-out mechanisms provided by third-party advertisers and ad networks. However, please note that disabling cookies may affect your experience on our website and may limit the functionality of certain features.</p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                        <h2>Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact us at hi@skiver.co.uk.</p>

                        <p>This Privacy Policy was last updated on 7 March 2024.</p>
                    </section>
                </main>
            </div>
        </div>
    )
}