import React, { useReducer, useState } from 'react'

import { Content } from './containers/Content/Content'
import { ContentContext } from './context/ContentContext'
import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { ControlPanelContext } from './context/ControlPanelContext'
import { data } from './db'
import { dateToNum } from './helpers'
import styles from './app.module.css'
import { useGetLocalStorage } from './customHooks/useGetLocalStorage'
import { useRemoveSketchLimit } from './customHooks/useRemoveSketchLimit'
import { useSetLocalStorage } from './customHooks/useSetLocalStorage'
import { useSortArchive } from './customHooks/useSortArchive'

type ArchiveSortReducerAction = {
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
  archiveList: ISketch[]
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
    archiveList: []
  })

  const { isVisible, archiveList } = archive
  const { addedSketches, sketchLimit, sortBy, watchedSketches } = globalState


  const archiveSortReducer = (state: ISketch[], action: ArchiveSortReducerAction) => {
    switch (action.type) {
      case 'date-asc':
        return [...archiveList].sort((a, b) => dateToNum(a.date, a.time) - dateToNum(b.date, b.time))
      case 'date-desc':
        return [...archiveList].sort((a, b) => dateToNum(b.date, b.time) - dateToNum(a.date, a.time))
      case 'rate-asc':
        return [...archiveList].sort((a, b) => +a.rating - +b.rating)
      case 'rate-desc':
        return [...archiveList].sort((a, b) => +b.rating - +a.rating)
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
      setArchive({ ...archive, archiveList: [...archive.archiveList, removedElement] })
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
    dispatch({ type: value } as ArchiveSortReducerAction)
  }

  const handleReset = () => {
    localStorage.clear()
    setSketches([])
    setArchive({ isVisible: false, archiveList: [] })
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
      <div className={styles.container}>
        <ControlPanelContext.Provider value={{
          handleAddSketch,
          handleUndoAddSketch,
          handleClearList,
          handleArchiveToggle,
          addedSketches,
          currentSketches,
          watchedSketches,
          handleSort,
          sortBy,
          handleReset
        }}>
          <ControlPanel />
        </ControlPanelContext.Provider>
        <ContentContext.Provider value={{
          isVisible,
          archiveList,
          sketchLimit,
          sketches,
          handleCheck,
          handleRate,
          handleRemove
        }}>
          <Content />
        </ContentContext.Provider>
      </div>
    </div>
  )
}

export default App
