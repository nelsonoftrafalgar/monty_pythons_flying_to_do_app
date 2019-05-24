import { ISketch } from '../../App'
import React from 'react'
import styles from './Archive.module.css'

interface IArchiveProps {
  archive: ISketch[]
}

const Archive: React.FC<IArchiveProps> = ({ archive }) => {
  const archivedSketches = archive.map((sketch) => {
    const { name, date, time, rating } = sketch
    if (!date) {
      return sketch
    }

    return (
      <li className={styles.listItem} key={name}>
        <p>{name}</p>
        <p className={styles.date}>{date} {time}</p>
        <p className={styles.rating}>{rating}</p>
      </li>
    )
  })

  return (
    <div className={styles.container}>
      <ul>{archivedSketches}</ul>
    </div>
  )
}

export { Archive }
