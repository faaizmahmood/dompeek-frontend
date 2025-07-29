import Cookies from 'js-cookie';
import { logout } from '../redux/authSlice';

const handleLogout = (dispatch) => {
    Cookies.remove('authToken');
    dispatch(logout());
    window.location.href = '/';
};

export default handleLogout;
