import React from 'react'
import styles from './Loader.module.css'
import Image from 'next/image'
export const Loader = () => {
  return (
    <>
      <div className={styles.loader}></div>
      <Image src='/loader.gif' alt='loading' unoptimized height={150} width={150}/>
    </>
  )
}
