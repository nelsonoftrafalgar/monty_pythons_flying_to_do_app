import { ISketch, StateReducerAction } from './state/types'
import React, { useReducer } from 'react'

import { Content } from './containers/Content/Content'
import { ContentContext } from './context/ContentContext'
import { ControlPanel } from './containers/ControlPanel/ControlPanel'
import { ControlPanelContext } from './context/ControlPanelContext'
import { data } from './db'
import produce from 'immer'
import { stateReducer } from './state/reducers'
import styles from './app.module.css'
import { useGetLocalStorage } from './customHooks/useGetLocalStorage'
import { useRemoveSketchLimit } from './customHooks/useRemoveSketchLimit'
import { useSetLocalStorage } from './customHooks/useSetLocalStorage'

const App: React.FC = () => {

  const initialState = {
    globalState: {
      addedSketches: 0,
      sketchLimit: false,
      watchedSketches: 0,
      sortBy: "",
    },
    sketches: [],
    archive: {
      isVisible: false,
      archiveList: []
    }
  }

  const [state, dispatch] = useReducer(produce(stateReducer), initialState)
  const { globalState, archive, sketches } = state
  const { watchedSketches, addedSketches, sortBy, sketchLimit } = globalState
  const { isVisible, archiveList } = archive
  const random = Math.floor(Math.random() * data.length)

  useGetLocalStorage(dispatch)
  useSetLocalStorage(sketches, archive, globalState)
  useRemoveSketchLimit(sketches, dispatch)

  const handleAddSketch = () => {
    if (sketches.length === 10) {
      dispatch({ type: 'SET-SKETCH-LIMIT', payload: true })
      return
    }
    const newSketch = {
      name: data[random],
      checked: false,
      date: '',
      time: '',
      rating: ''
    }
    dispatch({ type: 'ADD-SKETCH', payload: newSketch })
  }

  const handleUndoAddSketch = () => dispatch({ type: 'UNDO-ADD-SKETCH' })
  const handleArchiveToggle = () => dispatch({ type: 'TOGGLE-ARCHIVE', payload: !isVisible })
  const handleClearList = () => dispatch({ type: 'CLEAR-SKETCHES' })

  const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget
    const updatedList = sketches.map((sketch: ISketch) => {
      if (sketch.name === value) {
        return {
          ...sketch,
          checked
        }
      }
      return sketch
    })
    dispatch({
      type: 'CHECK-SKETCH',
      primaryPayload: checked ? watchedSketches + 1 : watchedSketches - 1,
      secondaryPayload: updatedList
    })
  }

  const handleRemove = (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const removedElement = sketches.find((sketch: ISketch) => sketch.name === name)
    if (removedElement && removedElement.checked) {
      const date = new Date()
      removedElement.date = date.toLocaleDateString()
      removedElement.time = date.toLocaleTimeString()
      dispatch({ type: 'ADD-TO-ARCHIVE', payload: [...state.archive.archiveList, removedElement] })
    }
    const updatedList = sketches.filter((sketch: ISketch) => sketch.name !== name)
    dispatch({ type: 'REMOVE-SKETCH', payload: updatedList })
  }

  const handleRate = (name: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    const hasMultipleZeros = value.replace(/[^0]/g, "").length > 1
    if (hasMultipleZeros) {
      return
    }

    let ratingValue: string = value

    if (+value > 10) {
      ratingValue = '10'
    } else if (+value < 0) {
      ratingValue = '0'
    }

    const updatedList = sketches.map((sketch: ISketch) => {
      if (sketch.name === name) {
        sketch.rating = ratingValue
      }
      return sketch
    })
    dispatch({ type: 'RATE-SKETCH', payload: updatedList })
  }

  const handleSort = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    dispatch({ type: value } as StateReducerAction)
  }

  const handleReset = () => {
    localStorage.clear()
    dispatch({ type: 'MASTER-RESET', payload: initialState })
  }

  const currentSketches = sketches.length
  const archivedSketches = archiveList.length

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
          handleReset,
          archivedSketches
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
