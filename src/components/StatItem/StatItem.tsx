import React from 'react'
import styles from './statItem.module.css'

interface IStatItem {
  text: string
  value: number
}

const StatItem: React.FC<IStatItem> = ({ text, value }) => {
  return (
    <p className={styles.item}>{text}: <span>{value}</span></p>
  )
}

export { StatItem }
