import styles from './signup.module.scss';
import { useSignup } from './useSignup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const {
        formik,
        isLoading,
        showPassword,
        showConfirmPassword,
        toggleShowPassword,
        toggleShowConfirmPassword,
    } = useSignup();

    return (
        <section className={styles.Signup}>
            <h2>Sign Up</h2>

            <form onSubmit={formik.handleSubmit} className={`${styles.form} mt-4`}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <span className={styles.error}>{formik.errors.name}</span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span className={styles.error}>{formik.errors.email}</span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordField}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <span onClick={toggleShowPassword} className={styles.eyeIcon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <span className={styles.error}>{formik.errors.password}</span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className={styles.passwordField}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        <span onClick={toggleShowConfirmPassword} className={styles.eyeIcon}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <span className={styles.error}>{formik.errors.confirmPassword}</span>
                    )}
                </div>

                <div className={styles.formGroupCheckbox}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formik.values.agree}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span>I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></span>
                    </label>
                    {formik.touched.agree && formik.errors.agree && (
                        <span className={styles.error}>{formik.errors.agree}</span>
                    )}
                </div>

                <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                    {isLoading ? 'Signing up...' : 'Create Account'}
                </button>

            </form>
        </section>
    );
};

export default Signup;
