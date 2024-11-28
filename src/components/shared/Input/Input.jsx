import React from 'react'
export const Input = ({lbl,lblCols,inputCols,errorMsg,value,isRequired,isDisabled,filePath,type,name,errMsgCols,handleChange,placeholder,src}) => {
  const inputDisplayHandle = () =>{
    switch(type){
      case 'file':
        return <>
          <input disabled={isDisabled} placeholder={placeholder} type={type} name={name} className='form-control' onChange={handleChange}/>
          <img height={100} width={100}  src={src || (value && `${process.env.NEXT_PUBLIC_UPLOAD_URL}${value}?date=${Date.now()}`)} />
        </>
      default:
        return <input value={value} disabled={isDisabled} placeholder={placeholder} type={type} name={name} className='form-control' onChange={handleChange}/>
      }
  }
  return (
    <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <label className='form-label'>{lbl}{isRequired && <span className='text-danger'>*</span>}:</label>
        </div>
        <div className={`col-sm-${inputCols}`}>
          {inputDisplayHandle()}
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>
  )
}