import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import apiService from '../../../utils/apiClient'; // <-- your Axios wrapper
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);


    const validationSchema = Yup.object({
        name: Yup.string().min(2).max(50).required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6).required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        agree: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agree: false,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);

            const SignupPayload = {
                email: values.email,
                name: values.name,
                password: values.password
            };

            try {
                const res = await apiService.post('/auth/signup', SignupPayload);
                toast.success("Signup successful!");
                const { authToken } = res.data;
                Cookies.set('authToken', authToken, { expires: 7 });
                resetForm();
                window.location.href = '/dashboard'
            } catch (error) {
                const msg = error?.response?.data?.message || 'Signup failed. Try again.';
                toast.error(msg);
            } finally {
                setIsLoading(false);
            }
        }
    });

    return {
        formik,
        isLoading,
        showPassword,
        showConfirmPassword,
        toggleShowPassword,
        toggleShowConfirmPassword,
    };
};
