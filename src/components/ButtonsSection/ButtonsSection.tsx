import React, { useContext } from 'react'

import { ControlPanelContext } from '../../context/ControlPanelContext'

const ButtonsSection = () => {
  const {
    handleAddSketch,
    handleArchiveToggle,
    handleUndoAddSketch,
    handleReset,
    handleClearList
  } = useContext(ControlPanelContext)

  return (
    <div>
      <button onClick={handleAddSketch}>Add Sketch</button>
      <button onClick={handleUndoAddSketch}>Undo Add Sketch</button>
      <button onClick={handleClearList}>Clear List</button>
      <button onClick={handleArchiveToggle}>Toggle Archive</button>
      <button onClick={handleReset}>Master reset</button>
    </div>
  )
}

export { ButtonsSection }