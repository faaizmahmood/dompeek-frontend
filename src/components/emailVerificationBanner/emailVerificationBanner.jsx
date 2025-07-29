import React from 'react';
import styles from './emailVerificationBanner.module.scss';
import { MdEmail } from 'react-icons/md';
import { useAppSelector } from '../../redux/hooks';
const EmailVerificationBanner = () => {
  const { profile } = useAppSelector((state) => state.user);

  if (!profile?.data || profile.data?.isVerified) return null;

  return (
    <div className={styles.banner}>
      <MdEmail size={24} className={styles.icon} />
      <span>Your email is not verified.</span>
      <a href="#" className={styles.verifyLink}>
        Verify Now
      </a>
    </div>
  );
};

export default EmailVerificationBanner;
