import { Link } from "react-router-dom"

export default function Logo() {
    return (
        <div className="logo-wrapper">
            <div id="logo">
                <Link to="/">Skiver</Link>
            </div>
        </div>
    )
}