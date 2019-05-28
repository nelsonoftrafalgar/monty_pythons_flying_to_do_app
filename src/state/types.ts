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

export interface IState {
  globalState: IGlobalSate
  sketches: ISketch[]
  archive: IArchive
}

interface INewSketch {
  name: string
  checked: boolean
  date: string
  time: string
  rating: string
}

export type Dispatch = (value: StateReducerAction) => void

type AddSketch = {
  type: 'ADD-SKETCH',
  payload: INewSketch
}

type UndoAddSketch = {
  type: 'UNDO-ADD-SKETCH'
}

type RemoveSketch = {
  type: 'REMOVE-SKETCH'
  payload: ISketch[]
}

type ClearSketches = {
  type: 'CLEAR-SKETCHES'
}

type SetSketchLimit = {
  type: 'SET-SKETCH-LIMIT'
  payload: boolean
}

type CheckSketch = {
  type: 'CHECK-SKETCH'
  primaryPayload: number
  secondaryPayload: ISketch[]
}

type AddToArchive = {
  type: 'ADD-TO-ARCHIVE'
  payload: ISketch[]
}

type ToggleArchive = {
  type: 'TOGGLE-ARCHIVE'
  payload: boolean
}

type RateSketch = {
  type: 'RATE-SKETCH'
  payload: ISketch[]
}

type MasterReset = {
  type: 'MASTER-RESET'
  payload: IState
}

type ArchiveSort = {
  type: 'SORT-DATE-ASC' | 'SORT-DATE-DESC' | 'SORT-RATE-ASC' | 'SORT-RATE-DESC'
}

type GetLocalStorage = {
  type: 'GET-LOCAL-STORAGE'
  payload: IState
}

export type StateReducerAction = AddSketch
  | UndoAddSketch
  | ClearSketches
  | SetSketchLimit
  | CheckSketch
  | RemoveSketch
  | AddToArchive
  | ToggleArchive
  | RateSketch
  | MasterReset
  | ArchiveSort
  | GetLocalStorage