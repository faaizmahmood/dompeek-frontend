import React, { useState } from 'react';
import styles from './emailVerificationBanner.module.scss';
import Model from '../model/model';
import { MdEmail } from 'react-icons/md';
import { useAppSelector } from '../../redux/hooks';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import apiService from '../../utils/apiClient'; // adjust the path as needed

const EmailVerificationBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { profile } = useAppSelector((state) => state.user);

  const handleModalClose = () => setShowModal(false);

  const handleEmailSend = async () => {
    try {
      setLoading(true);

      const { hostname, port } = window.location;
      let domain = hostname;
      if (hostname === 'localhost' && port) {
        domain = `${hostname}:${port}`;
      }

      const res = await apiService.post('/mail/send-verification-email', { domain });

      if (res.data?.msg) {
        // toast.success(res.data.msg);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.msg || "Failed to send verification email";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Render nothing if already verified or no profile
  if (!profile?.data || profile.data?.verified) return null;

  return (
    <>
      <div className={styles.banner}>
        <MdEmail size={24} className={styles.icon} />
        <span>Your email is not verified.</span>
        <p className={styles.verifyLink} onClick={handleEmailSend}>
          {loading ? <PulseLoader size={5} color="#0f172a" /> : "Verify Now"}
        </p>
      </div>

      <Model showModal={showModal} handleClose={handleModalClose}>
        <div className={styles.successContainer}>
          <div className={styles.animatedTick}>
            <svg viewBox="0 0 52 52">
              <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
              <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h4 className="mt-sm-5">Verification Email Sent!</h4>
          <p className="text-muted">Please check your inbox and follow the link to verify your email.</p>
        </div>
      </Model>
    </>
  );
};

export default EmailVerificationBanner;
