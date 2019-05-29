import React, { useContext } from 'react'

import { Button } from '../Button/Button'
import { ControlPanelContext } from '../../context/ControlPanelContext'
import { Title } from '../Title/Title'
import styles from './buttonsSection.module.css'

const ButtonsSection = () => {
  const {
    handleAddSketch,
    handleArchiveToggle,
    handleUndoAddSketch,
    handleReset,
    handleClearList
  } = useContext(ControlPanelContext)

  return (
    <div className={styles.container}>
      <Title text='Control Panel' />
      <Button handler={handleAddSketch} text='Add Sketch' />
      <Button handler={handleUndoAddSketch} text='Undo Add Sketch' />
      <Button handler={handleClearList} text='Clear List' />
      <Button handler={handleArchiveToggle} text='Toggle Archive' />
      <Button critical={true} handler={handleReset} text='Master reset' />
    </div>
  )
}

export { ButtonsSection }