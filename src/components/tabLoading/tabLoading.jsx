import { HashLoader } from 'react-spinners'
import styles from './tabLoading.module.scss'

const TabLoading = ({text}) => {
    return (
        <>
            <div className={styles.loading}>
                <HashLoader color="#38bdf8" size={40} />
                <h4 className="mt-3 text-white">{text}</h4>
            </div>
        </>
    )
}

export default TabLoading