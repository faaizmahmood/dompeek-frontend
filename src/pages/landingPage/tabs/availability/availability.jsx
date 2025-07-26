import useAvailability from './useAvailability';
import styles from './availability.module.scss'
import { HashLoader } from 'react-spinners';

const Availability = ({ whoisData }) => {

    const { isAvailable, availableSuggestions, loading } = useAvailability({ whoisData });

    if (!whoisData) return null;

    return (
        <div className={`${styles.availability}`}>
            {isAvailable ? (
                <h3>🎉 This domain is <strong>available</strong>!</h3>
            ) : (
                <>
                    <h3>❌ This domain is <strong>already registered</strong>.</h3>

                    {
                        loading ? <>
                            <div className={`${styles.loading}`}>
                                <HashLoader
                                    color="#38bdf8"
                                    size={40}
                                />
                                <h4 className='mt-3'>Finding Best Alternatives</h4>

                            </div>
                        </> : (
                            <>
                                {availableSuggestions.length > 0 && (
                                    <div className="mt-5">
                                        <h6>💡 Available Alternatives:</h6>

                                        <div className='d-flex flex-wrap gap-3 mt-4'>
                                            {availableSuggestions.map((alt, idx) => (
                                                <button key={idx}>
                                                    <a
                                                        href={`https://namecheap.com/domains/registration/results/?domain=${alt}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-info"
                                                    >
                                                        {alt}
                                                    </a>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    }

                </>
            )}
        </div>
    );
};


export default Availability