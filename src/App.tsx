import React, { useReducer, useState } from 'react'

import { Archive } from './containers/Archive/Archive'
import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { List } from './containers/List/List'
import { data } from './db'
import { dateToNum } from './helpers'
import styles from './App.module.css'
import { useGetLocalStorage } from './customHooks/useGetLocalStorage'
import { useRemoveSketchLimit } from './customHooks/useRemoveSketchLimit'
import { useSetLocalStorage } from './customHooks/useSetLocalStorage'
import { useSortArchive } from './customHooks/useSortArchive'

type ArchiveReducerAction = {
  type: 'date-asc' | 'date-desc' | 'rate-asc' | 'rate-desc'
}

export interface ISketch {
  name: string
  checked: boolean
  date: string
  time: string
  rating: string
}

export interface IArchive {
  isVisible: boolean
  list: ISketch[]
}

export interface IGlobalSate {
  addedSketches: number,
  sketchLimit: boolean,
  watchedSketches: number,
  sortBy: string,
}

const App: React.FC = () => {

  const [sketches, setSketches] = useState<ISketch[]>([])
  const [globalState, setGlobalState] = useState<IGlobalSate>({
    addedSketches: 0,
    sketchLimit: false,
    watchedSketches: 0,
    sortBy: "",
  })

  const [archive, setArchive] = useState<IArchive>({
    isVisible: false,
    list: []
  })

  const { isVisible, list } = archive
  const { addedSketches, sketchLimit, sortBy, watchedSketches } = globalState


  const archiveSortReducer = (state: ISketch[], action: ArchiveReducerAction) => {
    switch (action.type) {
      case 'date-asc':
        return [...list].sort((a, b) => dateToNum(a.date, a.time) - dateToNum(b.date, b.time))
      case 'date-desc':
        return [...list].sort((a, b) => dateToNum(b.date, b.time) - dateToNum(a.date, a.time))
      case 'rate-asc':
        return [...list].sort((a, b) => +a.rating - +b.rating)
      case 'rate-desc':
        return [...list].sort((a, b) => +b.rating - +a.rating)
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(archiveSortReducer, [])
  const random = Math.floor(Math.random() * data.length)

  useSortArchive(setArchive, state)
  useGetLocalStorage(setGlobalState, setSketches, setArchive)
  useSetLocalStorage(sketches, archive, globalState)
  useRemoveSketchLimit(sketches, setGlobalState)

  const handleAddSketch = () => {
    if (sketches.length === 10) {
      setGlobalState({ ...globalState, sketchLimit: true })
      return
    }
    const newSketch = {
      name: data[random],
      checked: false,
      date: '',
      time: '',
      rating: ''
    }
    setSketches([...sketches, newSketch])
    setGlobalState({ ...globalState, addedSketches: addedSketches + 1 })
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
    setGlobalState({ ...globalState, watchedSketches: checked ? watchedSketches + 1 : watchedSketches - 1 })
    setSketches(updatedList)
  }

  const handleRemove = (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const removedElement = sketches.find((sketch) => sketch.name === name)
    if (removedElement && removedElement.checked) {
      const date = new Date()
      removedElement.date = date.toLocaleDateString()
      removedElement.time = date.toLocaleTimeString()
      setArchive({ ...archive, list: [...archive.list, removedElement] })
    }
    const updatedList = sketches.filter((sketch) => sketch.name !== name)
    setSketches(updatedList)
  }

  const handleArchiveToggle = () => {

    setArchive({ ...archive, isVisible: !isVisible })
  }

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
    setGlobalState({ ...globalState, sortBy: value })
    dispatch({ type: value } as ArchiveReducerAction)
  }

  const handleReset = () => {
    localStorage.clear()
    setSketches([])
    setArchive({ isVisible: false, list: [] })
    setGlobalState({
      addedSketches: 0,
      sketchLimit: false,
      watchedSketches: 0,
      sortBy: "",
    })
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
        handleReset={handleReset}
      />
      {isVisible ?
        <Archive archive={list} /> :
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
