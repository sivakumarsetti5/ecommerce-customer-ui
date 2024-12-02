import React, { Suspense, useState } from 'react'
import Footer from "./components/Footer";
import Header from "./components/Header";
import { publicRoutes} from './routes/public/routes';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from './routes/private/routes';
import { Loader } from './components/shared/Loader/Loader';
import { Toaster } from './components/shared/Toaster/Toaster';
import { Modal } from './components/shared/Modal/Modal';
import styles from './App.module.css'

const App = () => {
  const isLoggedIn =  useSelector((state)=>state?.appReducer?.isLoggedIn)
  const isShowLoader = useSelector((state)=>state?.appReducer?.isShowLoader)
  const isShowToaster = useSelector((state)=>state?.appReducer?.toaster?.isShowToaster)
  const isShowModal = useSelector((state)=>state?.appReducer?.modal?.isShowModal)
  return (
    <div data-testid="app" className={styles.appContainer}>
      <Header/>
      <Suspense fallback='Loading...'>
         {useRoutes(isLoggedIn ? privateRoutes:publicRoutes)}
      </Suspense>
      <Footer/>
      {isShowLoader && <Loader/>}
      {isShowToaster && <Toaster/>}
      {isShowModal && <Modal/>}
    </div>
  );
}

export default App