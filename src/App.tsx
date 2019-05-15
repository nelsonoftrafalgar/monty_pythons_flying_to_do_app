import React, { useState } from 'react'

import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { List } from './containers/List/List'
import { data } from './db'
import styles from './App.module.css'

const App: React.FC = () => {

  const [addedSketches, setAddedSketches] = useState<number>(0)
  const [sketches, setSketches] = useState<string[]>([])

  const random = Math.floor(Math.random() * data.length)

  const handleAddSketch = () => {
    setSketches([...sketches, data[random]])
    setAddedSketches(addedSketches + 1)
  }

  const handleUndoAddSketch = () => {
    setSketches(sketches.filter((_, i) => i !== sketches.length - 1))
  }

  const handleClearList = () => {
    setSketches([])
  }

  const currentSketches = sketches.length

  return (
    <div className={styles.app}>
      <ControlPanel
        handleAddSketch={handleAddSketch}
        handleUndoAddSketch={handleUndoAddSketch}
        handleClearList={handleClearList}
        addedSketches={addedSketches}
        currentSketches={currentSketches}
      />
      <List sketches={sketches} />
    </div>
  )
}

export default App
