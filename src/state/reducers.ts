import { IState, StateReducerAction } from "./types"

import { dateToNum } from "../helpers"

export const stateReducer = (state: IState, action: StateReducerAction): IState => {
  const { type } = action
  const { addedSketches } = state.globalState
  const { archiveList } = state.archive
  switch (action.type) {
    case 'ADD-SKETCH':
      return {
        ...state,
        sketches: [...state.sketches, action.payload],
        globalState: {
          ...state.globalState,
          addedSketches: addedSketches + 1
        }
      }
    case 'REMOVE-SKETCH':
      return {
        ...state,
        sketches: action.payload
      }
    case 'ADD-TO-ARCHIVE':
      return {
        ...state,
        archive: {
          ...state.archive,
          archiveList: action.payload
        }
      }
    case 'TOGGLE-ARCHIVE':
      return {
        ...state,
        archive: {
          ...state.archive,
          isVisible: action.payload
        }
      }
    case 'UNDO-ADD-SKETCH':
      return {
        ...state,
        sketches: state.sketches.filter((_, i) => i !== state.sketches.length - 1)
      }
    case 'CLEAR-SKETCHES':
      return {
        ...state,
        sketches: []
      }
    case 'SET-SKETCH-LIMIT':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          sketchLimit: action.payload,
        }
      }
    case 'CHECK-SKETCH':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          watchedSketches: action.primaryPayload,
        },
        sketches: action.secondaryPayload
      }
    case 'RATE-SKETCH':
      return {
        ...state,
        sketches: action.payload
      }
    case 'MASTER-RESET':
      return action.payload
    case 'SORT-DATE-ASC':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          sortBy: type
        },
        archive: {
          ...state.archive,
          archiveList: archiveList.sort((a, b) => dateToNum(a.date, a.time) - dateToNum(b.date, b.time))
        }
      }
    case 'SORT-DATE-DESC':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          sortBy: type
        },
        archive: {
          ...state.archive,
          archiveList: archiveList.sort((a, b) => dateToNum(b.date, b.time) - dateToNum(a.date, a.time))
        }
      }
    case 'SORT-RATE-ASC':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          sortBy: type
        },
        archive: {
          ...state.archive,
          archiveList: archiveList.sort((a, b) => +a.rating - +b.rating)
        }
      }
    case 'SORT-RATE-DESC':
      return {
        ...state,
        globalState: {
          ...state.globalState,
          sortBy: type
        },
        archive: {
          ...state.archive,
          archiveList: archiveList.sort((a, b) => +b.rating - +a.rating)
        }
      }
    case 'GET-LOCAL-STORAGE':
      return action.payload
    default:
      return state
  }
}