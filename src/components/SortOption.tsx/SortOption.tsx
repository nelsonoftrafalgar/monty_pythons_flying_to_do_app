import React from 'react'
import styles from './sortOption.module.css'

interface ISortOption {
  value: string
  text: string
  sortBy: string
  handler: (e: React.FormEvent<HTMLInputElement>) => void
}

const SortOption: React.FC<ISortOption> = ({ sortBy, handler, value, text }) => {
  return (
    <label className={styles.option}>
      <input className={styles.input} type="radio" value={value} checked={value === sortBy} onChange={handler} />
      {text}
    </label>
  )
}

export { SortOption }
