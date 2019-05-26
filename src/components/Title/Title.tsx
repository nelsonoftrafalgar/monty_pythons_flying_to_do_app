import React from 'react'
import styles from './title.module.css'

interface ITitle {
  text: string
}

const Title: React.FC<ITitle> = ({ text }) => {

  return (
    <h2 className={styles.title}>{text}</h2>
  )
}

export { Title }