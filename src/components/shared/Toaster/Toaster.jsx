import React, { useEffect, useState } from 'react'
import styles from './Toaster.module.css'
import { updateStoreData } from '../../../services/functions'
import { useDispatch, useSelector } from 'react-redux'
export const Toaster = () => {
    const[width,setWidth] = useState(0)
    const dispatch = useDispatch()
    const{toasterMsg,color} = useSelector(state=>state?.appReducer?.toaster)
    useEffect(()=>{
      const interval = setInterval(()=>{
        setWidth(prev=>{
          if(prev === 290){
            clearInterval(interval)
            closeToaster()
            return 0
          }
          return prev+1
        })
        },100)
    },[])

    const closeToaster = ()=>{
      updateStoreData(dispatch,"TOASTER",{
        isShowToaster:false,
        toasterMsg:'',
        color:''
      })
    }
  return (
    <div className={styles.toaster} style={{backgroundColor:color}}>
      <div>{toasterMsg}</div>
      <b onClick={closeToaster}>X</b>
      <div style={{width}}></div>
    </div>
    
  )
}
