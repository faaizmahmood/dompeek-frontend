import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../utils/apiClient';
import Model from '../model/model';
import styles from './verifyEmail.module.scss'; // You'll need to style accordingly
import { PulseLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const { token } = useParams();
    // const [status, setStatus] = useState("Verifying...");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(true); // always open when visiting
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.profile?.data);

    const handleClose = () => {
        setShowModal(false);

        if (!user) {
            navigate('/auth/signin');
        } else {
            // navigate('')
            window.location.href = '/dashboard'
        }
        // else just close the modal (do nothing)
    };

    useEffect(() => {


        const verify = async () => {
            try {
                setLoading(true);

                await apiService.get(`/mail/verify-email/${token}`);

                // toast.success(res.data || "Email verified!");
                // setStatus("✅ Email successfully verified!");
                setSuccess(true);
            } catch (error) {
                console.error(error);
                // toast.error("Verification failed or expired");
                // setStatus("❌ Verification failed or link expired.");
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        if (token) verify();
    }, [navigate, token]);

    return (
        <Model showModal={showModal} handleClose={handleClose}>
            <div className={styles.verifyContainer}>
                {loading && (
                    <div className="text-center">
                        <PulseLoader size={10} color="#007bff" />
                        <p className="mt-4">Verifying your email, please wait...</p>
                    </div>
                )}

                {!loading && success === true && (
                    <div className={styles.animatedTick}>
                        <svg viewBox="0 0 52 52">
                            <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
                            <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <h4 className="mt-4">Email Verified!</h4>
                        <p className="text-muted">You can now log in and enjoy full access.</p>
                    </div>
                )}

                {!loading && success === false && (
                    <div className={styles.animatedCross}>
                        <svg viewBox="0 0 52 52">
                            <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
                            <path className={styles.cross} fill="none" d="M16 16 36 36 M36 16 16 36" />
                        </svg>
                        <h4 className="mt-4">Verification Failed</h4>
                        <p className="text-muted">The link may have expired or is invalid.</p>
                    </div>
                )}
            </div>
        </Model>
    );
};

export default VerifyEmail;
