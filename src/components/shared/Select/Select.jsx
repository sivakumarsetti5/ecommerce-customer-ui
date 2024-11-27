import React from 'react'
import Styles from './Select.module.css'

export const Select = ({lbl,lblCols,inputCols,errorMsg,value,isRequired,name,errMsgCols,handleChange,options,values}) => {
    return (
      <div className='row mb-3'>
          <div className={`col-sm-${lblCols} text-end`}>
              <label className='form-label'>{lbl}{isRequired && <span className='text-danger'>*</span>}:</label>
          </div>
          <div className={`col-sm-${inputCols}`}>
              <select className='form-select' onChange={handleChange} name={name} value={value}>
                <option>--select--</option>
                {options?.map((val,ind)=>{
                    return <option key={ind} value={values[ind]} >{val}</option>
                })}
              </select>
          </div>
          <div className={`col-sm-${errMsgCols}`}>
              {errorMsg && <b className='text-danger'>{errorMsg}</b>}
          </div>
      </div>
    )
  }
