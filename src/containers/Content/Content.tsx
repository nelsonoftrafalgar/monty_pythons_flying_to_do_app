import React, { useContext } from 'react'

import { Archive } from '../Archive/Archive'
import { ContentContext } from '../../context/ContentContext'
import { List } from '../List/List'
import styles from './content.module.css'

const Content = () => {
  const { isVisible } = useContext(ContentContext)
  return (
    <div className={styles.container}>
      {isVisible ?
        <Archive /> :
        <List />
      }
    </div>
  )
}

export { Content }
