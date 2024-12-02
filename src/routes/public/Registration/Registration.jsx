import React, { useState } from 'react'
import config from './config.json'
import { Input } from '../../../components/shared/Input/Input'
import { clearFormData, handleFieldLevelValidation, handleFormLevelValidation } from '../../../services/validations'
import Ajax from '../../../services/ajax'
import { updateStoreData } from '../../../services/functions'
import { useDispatch } from 'react-redux'
import styles from './Registration.module.css'


export const Registration = () => {
  const[inputControls,setInputControls] = useState(config)
  const dispatch = useDispatch()

  const handleChange = async(event) =>{
    await handleFieldLevelValidation(event,inputControls,setInputControls)
  }
  const handleSubmit = async()=>{
    const[isInValid,dataObj]= await handleFormLevelValidation(inputControls,setInputControls)
    if (isInValid) return
    try{
      updateStoreData(dispatch,"LOADER",true)
      let isSuccess = false
      const res =await Ajax.post("users/register",{data:dataObj})
      const{acknowledged,insertedId} = res?.data
      if(acknowledged && insertedId){
        isSuccess = true
        clearFormData(inputControls,setInputControls)
      }
      updateStoreData(dispatch,"TOASTER",{
        isShowToaster:true,
        toasterMsg:isSuccess? "Registration Successful":"Registration failure",
        color:isSuccess? "green" : "red"
      })

    }catch(ex){
      updateStoreData(dispatch,"TOASTER",{
        isShowToaster:true,
        toasterMsg:ex?.message,
        color:"red"
      })
    }
    finally{
      updateStoreData(dispatch,"LOADER",false)
    }
    
  }
  return (
    <div className={`container-fluid ${styles.registration}`}>
      <h3 className='text-center py-4'>Registration</h3>
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
