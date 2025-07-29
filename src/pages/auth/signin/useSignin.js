import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import apiService from '../../../utils/apiClient';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prev => !prev);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const res = await apiService.post('/auth/signin', values);
                toast.success('Login successful!');
                const { authToken } = res.data;
                Cookies.set('authToken', authToken, { expires: 7 });
                window.location.href = '/dashboard'
            } catch (error) {
                const msg = error?.response?.data?.message || 'Login failed. Try again.';
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
        toggleShowPassword
    };
};
