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
  const [isSelectAll,setIsSelectAll] = useState(true)

  const getCartItems = async() =>{
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.get(`users/cart?uid=${AppCookies.getCookie('uid')}`)
      setCartItems(res?.data?.[0]?.products?.map(obj=>{
        obj.isChecked = true
        return obj
      }) ||[]);
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

  const handleCheckBox = (event,id) =>{
      const{checked} = event?.target
      const _cartItems = [...cartItems]
      const currProduct = _cartItems.find(obj=>obj._id === id)
      currProduct.isChecked = checked
      setCartItems(_cartItems)
      setIsSelectAll(_cartItems.every((obj)=>obj.isChecked))
  }

  const fnSelectDeselect = () =>{
    let _cartItems = [...cartItems]
    _cartItems = _cartItems.map((obj)=>{
      obj.isChecked = !isSelectAll
      return obj
    })
    setCartItems(_cartItems)
    setIsSelectAll(!isSelectAll)
  }

  const handleBuyNow = () =>{
    const checkoutProducts = cartItems.filter(obj=>obj.isChecked)
    AppCookies.setCookie('readyToBuyList',JSON.stringify(checkoutProducts))
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
                 <>
                 <div className='mb-3'><button className='btn btn-primary' onClick={fnSelectDeselect}>{isSelectAll?"Deselect All":"Select All"}</button></div>
                 {
                  cartItems?.map((obj) => {
                      const{ _id, filePath, name, cost, category,isChecked} = obj
                      return <div className='row border mb-3 p-2 align-items-center'>
                          <div className='col-sm-1'>
                            <input type='checkbox' className='form-check-input' onChange={(event)=>{handleCheckBox(event,_id)}} checked={isChecked}/>
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
