import React, { useState } from 'react'
import config from './config.json'
import { Input } from '../../../components/shared/Input/Input'
import { clearFormData, handleFieldLevelValidation, handleFormLevelValidation } from '../../../services/validations'
import styles from './Login.module.css'
import Ajax from '../../../services/ajax'

export const Login = () => {
  const[inputControls,setInputControls] = useState(config)

  const handleChange = async(event) =>{
    await handleFieldLevelValidation(event,inputControls,setInputControls)
  }
  const handleSubmit = async()=>{
    const[isInValid,dataObj]= await handleFormLevelValidation(inputControls,setInputControls)
    if (isInValid) return
    try{
      const res = await Ajax.post('users/login',dataObj)
      if(res?.data){
        clearFormData(inputControls,setInputControls)
      }
    }catch(ex){

    }finally{

    }
    
  }
  return (
    <div className={`container-fluid ${styles.loginContainer}`}>
      <h3 className='text-center py-4'>Login</h3>
      {
        inputControls.map((obj,index)=>{
          return <Input {...obj} key={index} handleChange={handleChange}/>
        })
      }
      <div className='row'>
        <div className='offset-sm-5 col-sm-7'>
          <button onClick={handleSubmit} className='btn btn-dark'>Login</button>
        </div>
      </div>
    </div>
  )
}
