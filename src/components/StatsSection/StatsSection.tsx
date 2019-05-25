import React, { useContext } from 'react'

import { ControlPanelContext } from '../../context/ControlPanelContext'

const StatsSection = () => {
  const { addedSketches, currentSketches, watchedSketches } = useContext(ControlPanelContext)

  return (
    <div>
      <span>Total added sketches: {addedSketches}</span>
      <span>Currently added sketches: {currentSketches}</span>
      <span>Watched sketches: {watchedSketches}</span>
    </div>
  )
}

export { StatsSection }