import React from 'react'
import styles from './Footer.module.css'
export const Footer = () => {
  return (
    <div data-testid='footer' className={`position-fixed w-100 text-center bottom-0 ${styles.footer}`}>Copyright © Sivakumar All Rights Reserved.</div>
  )
}
