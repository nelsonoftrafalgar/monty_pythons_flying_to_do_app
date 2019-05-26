import React, { useContext } from 'react'

import { ControlPanelContext } from '../../context/ControlPanelContext'
import { SortOption } from '../SortOption.tsx/SortOption'
import { Title } from '../Title/Title'
import styles from './sortSection.module.css'

const SortSection = () => {
  const { sortBy, handleSort } = useContext(ControlPanelContext)

  return (
    <div className={styles.container}>
      <Title text='Archive sort' />
      <SortOption value='date-asc' sortBy={sortBy} handler={handleSort} text='Date ascending' />
      <SortOption value='date-desc' sortBy={sortBy} handler={handleSort} text='Date descending' />
      <SortOption value='rate-asc' sortBy={sortBy} handler={handleSort} text='Rating ascending' />
      <SortOption value='rate-desc' sortBy={sortBy} handler={handleSort} text='Rating descending' />
    </div>
  )
}

export { SortSection }