import React from 'react'
export const Input = ({lbl,lblCols,inputCols,errorMsg,value,isRequired,isDisabled,type,name,errMsgCols,handleChange,placeholder}) => {
  return (
    <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <label className='form-label'>{lbl}{isRequired && <span className='text-danger'>*</span>}:</label>
        </div>
        <div className={`col-sm-${inputCols}`}>
           <input value={value} disabled={isDisabled} placeholder={placeholder} type={type} name={name} className='form-control' onChange={handleChange}/>
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>
  )
}