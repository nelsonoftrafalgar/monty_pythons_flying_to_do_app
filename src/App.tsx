import React, { useState } from 'react'

import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { List } from './containers/List/List'
import { data } from './db'
import styles from './App.module.css'

export interface ISketch {
  name: string
  checked: boolean
}

const App: React.FC = () => {

  const [addedSketches, setAddedSketches] = useState<number>(0)
  const [sketches, setSketches] = useState<ISketch[]>([])

  const random = Math.floor(Math.random() * data.length)

  const handleAddSketch = () => {
    const newSketch = {
      name: data[random],
      checked: false
    }
    setSketches([...sketches, newSketch])
    setAddedSketches(addedSketches + 1)
  }

  const handleUndoAddSketch = () => {
    setSketches(sketches.filter((_, i) => i !== sketches.length - 1))
  }

  const handleClearList = () => {
    setSketches([])
  }

  const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value
    const updatedList = sketches.map((sketch) => {
      if (sketch.name === name) {
        return {
          ...sketch,
          checked: !sketch.checked
        }
      }
      return sketch
    })

    setSketches(updatedList)
  }

  const handleRemove = (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const updatedList = sketches.filter((sketch) => sketch.name !== name)
    setSketches(updatedList)
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
      <List
        sketches={sketches}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App
