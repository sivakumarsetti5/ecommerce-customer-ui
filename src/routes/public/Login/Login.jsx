import React, { useRef, useState } from 'react'
import config from './config.json'
import configOTP from './configOTP.json'
import { Input } from '../../../components/shared/Input/Input'
import { clearFormData, handleFieldLevelValidation, handleFormLevelValidation } from '../../../services/validations'
import styles from './Login.module.css'
import Ajax from '../../../services/ajax'
import { useDispatch } from 'react-redux'
import { AppCookies } from '../../../services/cookies'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const[inputControls,setInputControls] = useState(config)
  const[inputControlsOTP,setInputControlsOTP] = useState(configOTP)
  const userInfo = useRef()
  const dispatch = useDispatch()
  const[otp,setOtp] = useState('')
  const navigate = useNavigate()

  const handleChange = async(event) =>{
    await handleFieldLevelValidation(event,inputControls,setInputControls)
  }
  const handleChangeOTP = async(event) =>{
    await handleFieldLevelValidation(event,inputControlsOTP,setInputControlsOTP)
  }
  const genarateOTP = () =>{
    const numbers = '0123456789'
    let otpChar = ''
    for(let i=0;i<6;i++){
      otpChar+=numbers.charAt(Math.random()*numbers.length)
    }
    setOtp(otpChar)
  }
  const handleLogin = async()=>{
    debugger
    const[isInValid,dataObj]= await handleFormLevelValidation(inputControls,setInputControls)
    if (isInValid) return
    try{
      dispatch({type:"LOADER",payload:true})
      const res = await Ajax.post('users/login',dataObj)
      if(res?.data?.length){
        genarateOTP()
        userInfo.current = res.data[0]
        clearFormData(inputControls,setInputControls)
      }else{
        dispatch({type:"TOASTER",payload:{
          isShowToaster:true,
          toasterMsg:"Invalid Email/Phone Number",
          color:"red"
        }})
      }
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
  const handleValidateOTP = async() =>{
    const[isInValid,dataObj]= await handleFormLevelValidation(inputControlsOTP,setInputControlsOTP)
    if (isInValid) return
    //console.log(dataObj)
    if(otp===dataObj.otp){
      try{
      dispatch({type:"LOADER",payload:true})
      //console.log(userInfo)
      const res = await Ajax.post('users/get-token', { data: userInfo.current })
      const{email,phone,token} = res.data
      if(token){
        AppCookies.setCookie('uid',email,7)
        AppCookies.setCookie('phone',phone,7)
        AppCookies.setCookie("token",token,7)
        dispatch({type:"LOGIN",payload:true})
        navigate(-1)
      }
      }catch(ex){
        dispatch({type:'TOASTER',payload:{
          isShowToaster:true,
          toasterMsg:ex?.message,
          color:"red"
        }})

      }finally{
        dispatch({type:"LOADER",payload:false})
      }

    }else{
      dispatch({type:'TOASTER',payload:{
        isShowToaster:true,
        toasterMsg:"Invalid OTP",
        color:"red"
      }})
    }
    
  }
  return (
    <div className={`container-fluid ${styles.loginContainer}`}>
      <h3 className='text-center py-4'>Login {otp}</h3>
      {otp ?
      <>
      {
        inputControlsOTP.map((obj,index)=>{
          return <Input {...obj} key={index} handleChange={handleChangeOTP}/>
        })
      }
      <div className='row'>
        <div className='offset-sm-5 col-sm-7'>
          <button onClick={handleValidateOTP} className='btn btn-dark'>Validate</button>
        </div>
      </div>
      </>
      :<>
      {
        inputControls.map((obj,index)=>{
          return <Input {...obj} key={index} handleChange={handleChange}/>
        })
      }
      <div className='row'>
        <div className='offset-sm-5 col-sm-7'>
          <button onClick={handleLogin} className='btn btn-dark'>Login</button>
        </div>
      </div>
      </>}
    </div>
  )
}
