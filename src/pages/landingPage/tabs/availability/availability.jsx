import useAvailability from './useAvailability';
import styles from './availability.module.scss';
import { HashLoader } from 'react-spinners';
import TabLoading from '../../../../components/tabLoading/tabLoading';

const Availability = ({ whoisData }) => {
    const { isAvailable, availableSuggestions, loading } = useAvailability({ whoisData });

    if (!whoisData) return null;

    return (
        <div className={styles.availability}>
            {isAvailable ? (
                <h3 className='text-white'>🎉 This domain is <strong>available</strong>!</h3>
            ) : (
                <>
                    <h3 className='text-white'>❌ This domain is <strong>already registered</strong>.</h3>

                    {loading ? (
                        <TabLoading text={"Fetching Best Alternatives"}/>
                    ) : (
                        <>
                            {availableSuggestions.length > 0 ? (
                                <div className="mt-5">
                                    <h6 className='text-white'>💡 Available Alternatives:</h6>
                                    <div className="d-flex flex-wrap gap-3 mt-4">
                                        {availableSuggestions.map((alt, idx) => (
                                            <a
                                                key={idx}
                                                href={`https://www.godaddy.com/domainsearch/find?domainToCheck=${alt}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${styles.domainButton} btn btn-outline-info`}
                                            >
                                                {alt}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <p className='text-white'>😕 No available alternatives found at this moment.</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Availability;
