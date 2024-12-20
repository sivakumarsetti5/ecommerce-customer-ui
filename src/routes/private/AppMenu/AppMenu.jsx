import React, { useState,useEffect } from 'react'
import Ajax from '../../../services/ajax';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

import styles from './AppMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AppCookies} from '../../../services/cookies'

import { FaCartPlus } from "react-icons/fa"
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AppMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] =useState(null);
  const cartItemsCount = useSelector((state)=>state?.appReducer?.cartItemsCount)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCart = () =>{
    navigate("/cart")
   }
  const handleNavigation = (path) => {
    handleClose()
    navigate(path)
  };
  const handleClose = () =>{
    setAnchorEl(null);
  }
  const handleLogout=()=>{
     AppCookies.deleteAllCookies()
     navigate('/')
     dispatch({type:"LOGIN",payload:false})
  }
  const getCartItems = async() =>{
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
      dispatch({ type: "CART", payload: res?.data?.[0]?.products?.length })
  } catch (ex) {
      console.error(ex);
  } finally {
      dispatch({ type: "LOADER", payload: false })
  }
  }
  useEffect(()=>{
    getCartItems()
  },[])
  return (
    <>
    <Link to='/cart'>
    <div className={styles.cartImageContainer}>
      <IoCartOutline size={40} onClick={handleCart} cursor="pointer" />
      {cartItemsCount>0 && <span>{cartItemsCount}</span>}
    </div>
  </Link>
    <div className={styles.appMenu}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>handleNavigation("./profile")}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={()=>handleNavigation("./orders")}>
          <Avatar /> Orders
        </MenuItem>
        <MenuItem onClick={()=>handleNavigation("./address")}>
        <Avatar /> Address
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
    </>
  );
}