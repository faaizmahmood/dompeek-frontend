import styles from './header.module.scss'

const Header = () => {
    return (
        <>
            <header className={styles.header}>

                <div className={`container ${styles.headerContainer}`}>
                    <div class={styles.logo}>DomPeek<span>.com</span></div>
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Contact</a>
                    </nav>
                </div>

            </header>
        </>
    )
}

export default Header