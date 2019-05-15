import React from 'react'
import styles from './ControlPanel.module.css'

interface IContolPanelProps {
  addedSketches: number
  currentSketches: number
  handleAddSketch: () => void
  handleUndoAddSketch: () => void
  handleClearList: () => void
}

const ControlPanel: React.FC<IContolPanelProps> = ({
  currentSketches,
  addedSketches,
  handleClearList,
  handleUndoAddSketch,
  handleAddSketch
}) => {

  return (
    <div className={styles.container}>
      <button onClick={handleAddSketch}>Add Sketch</button>
      <button onClick={handleUndoAddSketch}>Undo Add Sketch</button>
      <button onClick={handleClearList}>Clear List</button>
      <span>Total added sketches: {addedSketches}</span>
      <span>Currently added sketches: {currentSketches}</span>
    </div>
  )
}

export { ControlPanel }