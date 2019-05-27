import React, { useContext } from 'react'

import { ControlPanelContext } from '../../context/ControlPanelContext'
import { StatItem } from '../StatItem/StatItem'
import { Title } from '../Title/Title'
import styles from './statsSection.module.css'

const StatsSection = () => {
  const {
    addedSketches,
    currentSketches,
    watchedSketches,
    archivedSketches
  } = useContext(ControlPanelContext)

  return (
    <div className={styles.container}>
      <Title text='Stats' />
      <StatItem text='Total added sketches' value={addedSketches} />
      <StatItem text='Currently added sketches' value={currentSketches} />
      <StatItem text='Watched sketches' value={watchedSketches} />
      <StatItem text='Archived sketches' value={archivedSketches} />
    </div>
  )
}

export { StatsSection }