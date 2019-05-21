import React, { useEffect, useState } from 'react'

import { Archive } from './containers/Archive/Archive'
import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { List } from './containers/List/List'
import { data } from './db'
import styles from './App.module.css'

export interface ISketch {
  name: string
  checked: boolean
  date: null | Date
  rating: string
}

interface IArchive {
  isVisible: boolean
  list: ISketch[]
}

const App: React.FC = () => {

  const [addedSketches, setAddedSketches] = useState<number>(0)
  const [sketches, setSketches] = useState<ISketch[]>([])
  const [archive, setArchive] = useState<IArchive>({ isVisible: false, list: [] })
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
      checked: false,
      date: null,
      rating: ''
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
    const removedElement = sketches.find((sketch) => sketch.name === name)
    if (removedElement && removedElement.checked) {
      removedElement.date = new Date()
      setArchive({ ...archive, list: [...archive.list, removedElement] })
    }
    const updatedList = sketches.filter((sketch) => sketch.name !== name)
    setSketches(updatedList)
  }

  const handleArchiveToggle = () => setArchive({ ...archive, isVisible: !archive.isVisible })

  const handleRate = (name: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const updatedList = sketches.map((sketch) => {
      if (sketch.name === name) {
        sketch.rating = value
      }
      return sketch
    })
    setSketches(updatedList)
  }

  const currentSketches = sketches.length

  return (
    <div className={styles.app}>
      <ControlPanel
        handleAddSketch={handleAddSketch}
        handleUndoAddSketch={handleUndoAddSketch}
        handleClearList={handleClearList}
        handleArchiveToggle={handleArchiveToggle}
        addedSketches={addedSketches}
        currentSketches={currentSketches}
        watchedSketches={watchedSketches}
      />
      {archive.isVisible ?
        <Archive archive={archive.list} /> :
        <List
          sketches={sketches}
          handleCheck={handleCheck}
          handleRemove={handleRemove}
          sketchLimit={sketchLimit}
          handleRate={handleRate}
        />
      }
    </div>
  )
}

export default App
