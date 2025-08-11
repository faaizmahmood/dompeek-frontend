import './styles/App.css'
import AppRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { useEffect } from 'react'
import { fetchUserProfile } from './redux/authSlice'
import 'react-loading-skeleton/dist/skeleton.css';
import "react-tooltip/dist/react-tooltip.css";

function App() {


  const dispatch = useAppDispatch();
  const { token, profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile, token]);

  return (
    <>
      {/* <Header /> */}
      <AppRoutes />
      {/* <Footer /> */}



      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
