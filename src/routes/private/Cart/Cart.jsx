import React, { useEffect, useState } from 'react'
import Ajax from '../../../services/ajax'
import { AppCookies } from '../../../services/cookies'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Cart.module.css'

export const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartItems,setCartItems] = useState([])
  const [selectedProducts,setSelectedProducts] = useState([])

  const getCartItems = async() =>{
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
      setCartItems(res?.data?.[0]?.products || []);
      dispatch({ type: "CART", payload: res?.data?.[0]?.products?.length })
  } catch (ex) {
      console.error(ex);
  } finally {
      dispatch({ type: "LOADER", payload: false })
  }
  }
  const fnDelete = async(id) =>{
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.post('users/delete-from-cart',{uid:AppCookies.getCookie('uid'),productId:id})
      const {modifiedCount,acknowledged} = res?.data || {}
      if(modifiedCount && acknowledged){
        getCartItems()
      }
  } catch (ex) {
      console.error(ex.message);
  } finally {
      dispatch({ type: "LOADER", payload: false })
  }
  }

  const handleCheckBox = (product) =>{
      if(selectedProducts.includes(product)){
        setSelectedProducts(selectedProducts.filter(item=>item!==product))
      }else{
        setSelectedProducts([...selectedProducts,product])
      }
  }

  const handleBuyNow = () =>{
    dispatch({type:"BUYNOW",payload:selectedProducts})
    navigate('/buy-now')
  }

  useEffect(()=>{
    getCartItems()
  },[])
  return (
    <div className={`container-fluid ${styles.cart}`}>
            <h3 className='my-3 text-center'>Cart</h3>
            {
              cartItems?.length ?
                 <>{
                  cartItems?.map((obj) => {
                      const{ _id, filePath, name, cost, category} = obj
                      return <div className='row border mb-3 p-2 align-items-center'>
                          <div className='col-sm-1'>
                            <input type='checkbox' className='form-check-input' onChange={()=>{handleCheckBox(obj)}} checked={selectedProducts.includes(obj)}/>
                          </div>
                          <div className='col-sm-2'><img src={`${process.env.REACT_APP_VENDOR_BASE_URL}${filePath}?time=${Date.now()}`} width={100} height={100} loading='lazy' /></div>
                          <div className='col-sm-2 text-bold'>{name}</div>
                          <div className='col-sm-2'>{cost}</div>
                          <div className='col-sm-2'>{category}</div>
                          <div className='col-sm-2'>
                            <button onClick={() => fnDelete(_id)} className='btn btn-danger'>Delete</button>
                          </div>
                      </div>
                  })}
                  <div className='text-end'>
                      <button onClick={handleBuyNow} className='btn btn-dark'>Buy Now</button>
                  </div>
                  </>

                  :
                  <h5 className='text-center'>No items found</h5>
          }
        </div>
  )
}
