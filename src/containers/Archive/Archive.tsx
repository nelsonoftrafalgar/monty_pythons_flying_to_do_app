import React, { useContext } from 'react'

import { ContentContext } from '../../context/ContentContext'
import { Title } from '../../components/Title/Title'
import styles from './archive.module.css'

const Archive: React.FC = () => {
  const { archiveList } = useContext(ContentContext)
  const archivedSketches = archiveList.map((sketch) => {
    const { name, date, time, rating } = sketch

    return (
      <li className={styles.listItem} key={name}>
        <p className={styles.name}>{name}</p>
        <p className={styles.date}>added: {date} {time}</p>
        <p className={styles.rating}>rating: {rating}</p>
      </li>
    )
  })

  return (
    <div className={styles.container}>
      <Title text='Archive' />
      <ul className={styles.list}>{archivedSketches}</ul>
    </div>
  )
}

export { Archive }
