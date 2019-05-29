import { IState, StateReducerAction } from "./types"

import { dateToNum } from "../helpers"

export const stateReducer = (draft: IState, action: StateReducerAction) => {
  const { type } = action
  switch (action.type) {
    case 'ADD-SKETCH':
      draft.sketches = [...draft.sketches, action.payload]
      draft.globalState.addedSketches += 1
      break
    case 'REMOVE-SKETCH':
      draft.sketches = action.payload
      break
    case 'ADD-TO-ARCHIVE':
      draft.archive.archiveList = action.payload
      break
    case 'TOGGLE-ARCHIVE':
      draft.archive.isVisible = action.payload
      break
    case 'UNDO-ADD-SKETCH':
      draft.sketches = draft.sketches.filter((_, i) => i !== draft.sketches.length - 1)
      break
    case 'CLEAR-SKETCHES':
      draft.sketches = []
      break
    case 'SET-SKETCH-LIMIT':
      draft.globalState.sketchLimit = action.payload
      break
    case 'CHECK-SKETCH':
      draft.globalState.watchedSketches = action.primaryPayload
      draft.sketches = action.secondaryPayload
      break
    case 'RATE-SKETCH':
      draft.sketches = action.payload
      break
    case 'MASTER-RESET':
      return action.payload
    case 'SORT-DATE-ASC':
      draft.globalState.sortBy = type
      draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => dateToNum(a.date, a.time) - dateToNum(b.date, b.time))
      break
    case 'SORT-DATE-DESC':
      draft.globalState.sortBy = type
      draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => dateToNum(b.date, b.time) - dateToNum(a.date, a.time))
      break
    case 'SORT-RATE-ASC':
      draft.globalState.sortBy = type
      draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => +a.rating - +b.rating)
      break
    case 'SORT-RATE-DESC':
      draft.globalState.sortBy = type
      draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => +b.rating - +a.rating)
      break
    case 'GET-LOCAL-STORAGE':
      return action.payload
    default:
      return draft
  }
}