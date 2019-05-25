import React from 'react'
import styles from './ControlPanel.module.css'

interface IContolPanelProps {
  sortBy: string
  watchedSketches: number
  addedSketches: number
  currentSketches: number
  handleAddSketch: () => void
  handleUndoAddSketch: () => void
  handleClearList: () => void
  handleArchiveToggle: () => void
  handleSort: (e: React.FormEvent<HTMLInputElement>) => void
  handleReset: () => void
}

const ControlPanel: React.FC<IContolPanelProps> = ({
  currentSketches,
  addedSketches,
  handleClearList,
  handleUndoAddSketch,
  handleAddSketch,
  handleArchiveToggle,
  watchedSketches,
  sortBy,
  handleSort,
  handleReset,
}) => {

  return (
    <div className={styles.container}>
      <button onClick={handleAddSketch}>Add Sketch</button>
      <button onClick={handleUndoAddSketch}>Undo Add Sketch</button>
      <button onClick={handleClearList}>Clear List</button>
      <button onClick={handleArchiveToggle}>Toggle Archive</button>
      <button onClick={handleReset}>Master reset</button>
      <span>Total added sketches: {addedSketches}</span>
      <span>Currently added sketches: {currentSketches}</span>
      <span>Watched sketches: {watchedSketches}</span>
      <p>Sort archive by:</p>
      <label><input type="radio" value="date-asc" checked={"date-asc" === sortBy} onChange={handleSort} /> Date ascending</label>
      <label><input type="radio" value="date-desc" checked={"date-desc" === sortBy} onChange={handleSort} /> Date descending</label>
      <label><input type="radio" value="rate-asc" checked={"rate-asc" === sortBy} onChange={handleSort} /> Rating ascending</label>
      <label><input type="radio" value="rate-desc" checked={"rate-desc" === sortBy} onChange={handleSort} /> Rating descending</label>
    </div>
  )
}

export { ControlPanel }