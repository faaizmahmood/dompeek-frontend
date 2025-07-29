import styles from './signin.module.scss';
import { useSignin } from './useSignin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
    const {
        formik,
        isLoading,
        showPassword,
        toggleShowPassword
    } = useSignin();

    return (
        <section className={styles.Signin}>
            <h2>Sign In</h2>

            <form onSubmit={formik.handleSubmit} className={styles.form}>
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

                <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                    {isLoading ? 'Signing in...' : 'Login'}
                </button>
            </form>
        </section>
    );
};

export default Signin;