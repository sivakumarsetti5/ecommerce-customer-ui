import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppMenu from '../../routes/private/AppMenu'
export const Header = () => {
 const isLoggedIn =  useSelector((state)=>state?.appReducer?.isLoggedIn)
  return (
    <div data-testid='header' className={styles.header}>
      <Link to='/'>
         <img src='eCart_logo.png'/>
      </Link>
      {isLoggedIn ? 
         <AppMenu/>:
         <div className={styles.auth}>
           <Link to='/login'>Login</Link>
           <Link to='/register'>Register</Link>
         </div>
         }
    </div>
  )
}
