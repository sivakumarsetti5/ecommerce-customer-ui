import React from 'react'
import styles from './AppForm.module.css'

export const AppForm = ({setIsShowForm,children,handleCloseForm}) => {
  return (
  <div>
    <div className={styles.formMask}></div>
    <div>
        <div className={styles.close} onClick={handleCloseForm}>X</div>
        {children}
    </div>

  </div>    
  )
}
