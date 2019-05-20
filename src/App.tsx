import React, { useEffect, useState } from 'react'

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
  const [sketchLimit, setSketchLimit] = useState<boolean>(false)
  const [watchedSketches, setWatchedSketches] = useState<number>(0)

  const random = Math.floor(Math.random() * data.length)

  useEffect(() => {
    if (sketches.length < 10) {
      setSketchLimit(false)
    }
  }, [sketches])

  const handleAddSketch = () => {
    if (sketches.length === 10) {
      setSketchLimit(true)
      return
    }
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
    const { checked, value } = e.currentTarget
    const updatedList = sketches.map((sketch) => {
      if (sketch.name === value) {
        return {
          ...sketch,
          checked
        }
      }
      return sketch
    })
    setWatchedSketches(checked ? watchedSketches + 1 : watchedSketches - 1)
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
        watchedSketches={watchedSketches}
      />
      <List
        sketches={sketches}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
        sketchLimit={sketchLimit}
      />
    </div>
  )
}

export default App
