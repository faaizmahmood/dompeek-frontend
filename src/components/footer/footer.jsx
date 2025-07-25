import styles from './footer.module.scss'

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <>
            <footer className={styles.footer}>
                <p>&copy; {year} DomPeek.com — All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer