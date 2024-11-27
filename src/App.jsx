import React, { Suspense } from 'react'
import Footer from "./components/Footer";
import Header from "./components/Header";
import { publicRoutes} from './routes/public/routes';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from './routes/private/routes';

const App = () => {
  const isLoggedIn =  useSelector((state)=>state?.appReducer?.isLoggedIn)
  return (
    <div data-testid="app">
      <Header/>
      <Suspense fallback='Loading...'>
         {useRoutes(isLoggedIn ? privateRoutes:publicRoutes)}
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App