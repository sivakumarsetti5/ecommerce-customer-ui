import React, { useEffect, useState,forwardRef  } from 'react'
import styles from './Captcha.module.css'

export const Captcha = forwardRef (({validateCaptcha,isValidCaptcha,isFirstTimeLoad},ref) => {
  const [captchaText,setCapatchText]=useState('')
  const[inputCaptcha,setInputCaptcha] = useState('')

  useEffect(()=>{
    fnGenerateCaptcha()
  },[])

  const fnGenerateCaptcha=()=>{
    let chars = "";
    const randomchar =
       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //Generate captcha for length of 5 with random character
    for (let i = 1; i <= 5; i++) {
      const randomIndex =Math.floor(Math.random() * randomchar.length)
      chars += randomchar.charAt(randomIndex)
    }
    setCapatchText(chars)
    validateCaptcha(false)
    setInputCaptcha('')
 }
 const handleCaptchaInput = (event) =>{
    const value = event.target.value
    setInputCaptcha(value)
    validateCaptcha(value === captchaText)
 }

  return (
    <div className='row'>
      <div className='col-sm-5 text-end'>
        <b>Enter Captcha:</b>
      </div>
      <div className='col-sm-3'>
        <p>
          <input className='form-control' value={inputCaptcha} onChange={handleCaptchaInput} placeholder='Enter Captcha'/>
        </p>
        <p>
          <span className={styles.captcha}><i>{captchaText}</i></span>
          <button ref={ref} onClick={fnGenerateCaptcha} className="btn btn-dark">refresh</button>
        </p>
      </div>
      <div className='col-sm-4 text-danger text-start'>
          {!isValidCaptcha && !isFirstTimeLoad && <b>Invalid Captch</b>}
      </div>
    </div>
  )
})
