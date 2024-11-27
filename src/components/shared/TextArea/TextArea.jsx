import React from 'react'
import Styles from './TextArea.module.css'

export const TextArea = ({lbl,lblCols,inputCols,errorMsg,value,isRequired,type,name,errMsgCols,handleChange,placeholder}) => {
    return (
      <div className='row mb-3'>
          <div className={`col-sm-${lblCols} text-end`}>
              <label className='form-label'>{lbl}{isRequired && <span className='text-danger'>*</span>}:</label>
          </div>
          <div className={`col-sm-${inputCols}`}>
              <textarea value={value} name={name} className='form-control' placeholder={placeholder} onChange={handleChange}/>
          </div>
          <div className={`col-sm-${errMsgCols}`}>
              {errorMsg && <b className='text-danger'>{errorMsg}</b>}
          </div>
      </div>
    )
  }
