import React, { useEffect, useReducer, useState } from 'react'

import { Archive } from './containers/Archive/Archive'
import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { List } from './containers/List/List'
import { data } from './db'
import styles from './App.module.css'

type ArchiveReducerAction = { type: 'date-asc' } | { type: 'date-desc' } | { type: 'rate-asc' } | { type: 'rate-desc' }

export interface ISketch {
  name: string
  checked: boolean
  date: Date
  rating: string
}

interface IArchive {
  isVisible: boolean
  list: ISketch[]
}

const App: React.FC = () => {

  const archiveReducer = (state: ISketch[], action: ArchiveReducerAction) => {
    switch (action.type) {
      case 'date-asc':
        return [...archive.list].sort((a, b) => a.date.getTime() - b.date.getTime())
      case 'date-desc':
        return [...archive.list].sort((a, b) => b.date.getTime() - a.date.getTime())
      case 'rate-asc':
        return [...archive.list].sort((a, b) => +a.rating - +b.rating)
      case 'rate-desc':
        return [...archive.list].sort((a, b) => +b.rating - +a.rating)
      default:
        return state
    }
  }

  const [addedSketches, setAddedSketches] = useState<number>(0)
  const [sketches, setSketches] = useState<ISketch[]>([])
  const [archive, setArchive] = useState<IArchive>({ isVisible: false, list: [] })
  const [sketchLimit, setSketchLimit] = useState<boolean>(false)
  const [watchedSketches, setWatchedSketches] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('')
  const [state, dispatch] = useReducer(archiveReducer, [])

  const random = Math.floor(Math.random() * data.length)

  useEffect(() => {
    setArchive((archive) => {
      return { ...archive, list: state }
    })
  }, [state])

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
      date: new Date(),
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

  const handleSort = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSortBy(value)
    dispatch({ type: value } as ArchiveReducerAction)
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
        handleSort={handleSort}
        sortBy={sortBy}
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
