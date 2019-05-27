import React from 'react'
import styles from './button.module.css'

interface IButton {
  handler: any
  text: string
}

const Button: React.FC<IButton> = ({ handler, text }) => {
  return (
    <button className={styles.button} onClick={handler}>{text}</button>
  )
}

export { Button }
