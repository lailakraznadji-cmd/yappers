export default function HeaderFooter({ children }) {
    return (
        <div>
            <header>Yappers</header>
            {children}
            <footer>© 2026 Yappers</footer>
        </div>
    );
}