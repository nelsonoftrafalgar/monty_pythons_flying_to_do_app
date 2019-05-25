import { ButtonsSection } from '../../components/ButtonsSection/ButtonsSection'
import React from 'react'
import { SortSection } from '../../components/SortSection/SortSection'
import { StatsSection } from '../../components/StatsSection/StatsSection'
import styles from './controlPanel.module.css'

const ControlPanel: React.FC = () => {

  return (
    <div className={styles.container}>
      <ButtonsSection />
      <StatsSection />
      <SortSection />
    </div>
  )
}

export { ControlPanel }