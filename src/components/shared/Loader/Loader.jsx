import React from 'react'
import styles from './Loader.module.css'
export const Loader = () => {
  return (
    <>
      <div className={styles.loader}></div>
      <img src='/loader.gif' alt='loading' unoptimized height={150} width={150}/>
    </>
  )
}
