import React,{useEffect, useState} from 'react'
import styles from './Orders.module.css'
import Ajax from '../../../services/ajax'
import { AppCookies } from '../../../services/cookies'
export const Orders = () => {
  const [ordersList,setOrdersList] = useState([])
  const getOrders = async()=>{
    try{
      const res = await Ajax.get(`orders/get?uid=${AppCookies.getCookie('uid')}`)
      setOrdersList(res?.data || [])
    }catch(ex){
      console.error(ex?.message)
    }
  }
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      <ul>
        {ordersList?.map(({address,orderData,orderPrice,phone,transactionId},ind)=>{
          return(<li>
            <div>{address}</div>
            <div>{orderData}</div>
            <div>{orderPrice}</div>
            <div>{phone}</div>
            <div>{transactionId}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
