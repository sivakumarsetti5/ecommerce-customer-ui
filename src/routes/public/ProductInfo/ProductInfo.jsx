import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { GET_PRODUCT_INFO } from '../../../graphql/queries/getProductInfo'
import styles from './ProductInfo.module.css'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
import Ajax from '../../../services/ajax'
export const ProductInfo = () => {
  const {id} = useParams()
  const[cartItems,setCartItems] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{loading,data,error,refetch} =  useQuery(GET_PRODUCT_INFO,{
    variables:{
      "productId": id
    }
  })
  const{name,category,cost,description,filePath} = data?.getProductInfo?.[0] || {}
  // console.log(data?.getProductInfo?.[0])
  const fnCheckItemInTheCart = ()=>{
    debugger
    return cartItems?.some((obj)=>obj._id===data?.getProductInfo[0]._id)
  }
  const handleAddToCart = async()=>{
    if(!AppCookies.isUserLoggedIn()){
      navigate('/login')
      return
    }
    if(fnCheckItemInTheCart()){
      dispatch({type:"TOASTER",payload:{
        isShowToaster:true,
        toasterMsg:"Already Added to the cart",
        color:"red"
      }})
      return
    }
    try{
      dispatch({type:"LOADER",payload:true})
      const res = await Ajax.post('users/add-to-cart',{uid:AppCookies.getCookie('uid'),product:data?.getProductInfo?.[0]})
      console.log(res?.data)
      const{acknowledged,modifiedCount,upsertedCount} = res?.data
      let isSuccess = false
      if(acknowledged && (modifiedCount || upsertedCount)){
        isSuccess=true
        navigate('/cart')
        dispatch({type:"CART",payload:cartItems?.length+1})
      }
      dispatch({type:"TOASTER",payload:{
        isShowToaster:true,
        toasterMsg:isSuccess? "Added to the cart":"Not Added ",
        color:isSuccess?'green':"red"
      }})
    }catch(ex){
      dispatch({type:"TOASTER",payload:{
        isShowToaster:true,
        toasterMsg:ex?.message,
        color:"red"
      }})
    }finally{
      dispatch({type:"LOADER",payload:false})
    }

  }
  const handleBuyNow = ()=>{
    if(!AppCookies.isUserLoggedIn()){
      navigate('/login')
    }
  }

  const getCartList = async() =>{
    try{
      const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie("uid")}`)
      setCartItems(res?.data?.[0].products)
      dispatch({type:"CART",payload:res?.data?.[0].products.length})
    }catch(ex){
      console.error(ex)
    }
  }
  
  
  useEffect(()=>{
    dispatch({
      type:"LOADER",
      payload:loading
    })
  },[loading])

  useEffect(()=>{
    getCartList()
  })
  return (
    <div>{data && 
    <div className={styles.productInfoCont}>
      <div className={styles.imgContainer}>
        <img
            src={`${process.env.REACT_APP_VENDOR_BASE_URL}${filePath}?time=${Date.now()}`}
            width={300}
            height={300}
            lazy="loading..."
            alt='product'
          />
      </div>
      <div className={styles.productDetailsContainer}>
         <div>{name}</div>
         <div>{category}</div>
         <div>RS: {cost}/-</div>
         <div>{description}</div>
         <div>
          <button className='btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
          <button className='btn btn-dark' onClick={handleBuyNow}>Buy Now</button>
         </div>
      </div>
    </div>
    }</div>
  )
}
