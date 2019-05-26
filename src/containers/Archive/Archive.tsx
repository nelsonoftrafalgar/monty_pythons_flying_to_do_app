import React, { useContext } from 'react'

import { ContentContext } from '../../context/ContentContext';
import styles from './archive.module.css'

const Archive: React.FC = () => {
  const { archiveList } = useContext(ContentContext)
  const archivedSketches = archiveList.map((sketch) => {
    const { name, date, time, rating } = sketch

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
