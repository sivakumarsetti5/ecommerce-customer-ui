import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppMenu from '../../routes/private/AppMenu'
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { FaCartPlus } from "react-icons/fa"
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

export const Header = () => {
 const isLoggedIn =  useSelector((state)=>state?.appReducer?.isLoggedIn)
 const navigate = useNavigate()
 const handleCart = () =>{
  navigate("/cart")
 }
 const fnHandleSearch = (event) =>{
 }
  return (
    <div data-testid='header' className={styles.header}>
      <Link to='/'>
         <img src='logo.png' alt='logo'/>
      </Link>
      <div>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,backgroundColor:"#efeff7"}}
          >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for Products"
            inputProps={{ 'aria-label': 'search for products' }}
            onChange={fnHandleSearch}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className='d-flex align-items-center'>
        <IoCartOutline size={40} onClick={handleCart} cursor="pointer"/>
        {isLoggedIn ? 
          <AppMenu/>:
          <div className={styles.auth}>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
          }
      </div>   
    </div>
  )
}
