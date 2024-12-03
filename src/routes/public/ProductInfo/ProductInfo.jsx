import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { GET_PRODUCT_INFO } from '../../../graphql/queries/getProductInfo'
import styles from './ProductInfo.module.css'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
export const ProductInfo = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{loading,data,error,refetch} =  useQuery(GET_PRODUCT_INFO,{
    variables:{
      "productId": id
    }
  })
  const handleAuth = (path) =>{
    const isLoggedIn = AppCookies.isUserLoggedIn()
    if(isLoggedIn){
      navigate(path)
    }else{
      navigate('/login')
    }
  }
  const handleAddToCart = ()=>{
    handleAuth('/cart')
  }
  const handleBuyNow = ()=>{
    handleAuth('/buy-now')
  }
  // console.log(data?.getProductInfo?.[0])
  const{name,category,cost,description,filePath} = data?.getProductInfo?.[0] || {}
  useEffect(()=>{
    dispatch({
      type:"LOADER",
      payload:loading
    })
  },[loading])
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
