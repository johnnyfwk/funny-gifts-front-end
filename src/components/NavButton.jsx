export default function NavButton({ isNavVisible, setIsNavVisible }) {
    function handleNavButton() {
        setIsNavVisible((currentNavVisibility) => !currentNavVisibility);
    }

    const styleNavButton = {
        transform: isNavVisible ? "rotate(-45deg)" : "rotate(0deg)"
    };

    return (
        <div id="nav-button" onClick={handleNavButton} style={styleNavButton}>
            <div></div>
            <div></div>
        </div>
    )
}